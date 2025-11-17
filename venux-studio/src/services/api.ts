import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
});

// Attach token from localStorage (if present) for authenticated requests
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("venux:token");
    if (token && config.headers)
      config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: on 401 try to refresh using stored refresh token, rotate and retry
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (v?: any) => void;
  reject: (err: any) => void;
  config: any;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else {
      if (token && p.config.headers)
        p.config.headers.Authorization = `Bearer ${token}`;
      p.resolve(axios(p.config));
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (
      err.response &&
      err.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken =
        typeof window !== "undefined"
          ? localStorage.getItem("venux:refresh")
          : null;
      if (!refreshToken) return Promise.reject(err);

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      isRefreshing = true;
      try {
        const r = await axios.post(`${api.defaults.baseURL}/auth/refresh`, {
          refreshToken,
        });
        const { accessToken, refreshToken: newRefresh } = r.data;
        localStorage.setItem("venux:token", accessToken);
        if (newRefresh) localStorage.setItem("venux:refresh", newRefresh);
        // notify auth context and other listeners
        try {
          window.dispatchEvent(
            new CustomEvent("venux:auth", {
              detail: { accessToken, refreshToken: newRefresh },
            })
          );
        } catch {}
        processQueue(null, accessToken);
        return api(originalRequest);
      } catch (e) {
        processQueue(e, null);
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(err);
  }
);

export const getProducts = async (q?: string) => {
  const res = await api.get("/products", { params: { q } });
  // adapt server product shape to client-friendly shape
  const items = (res.data.data || []).map((p: any) => ({
    id: p.id,
    title: p.name || p.title,
    price: p.price,
    images: (p.images || []).map((im: any) => im.url),
    hasPendant: p.hasPendant || false,
    slug: p.slug,
    raw: p,
  }));
  return { data: items, meta: res.data.meta };
};

export const getProduct = async (slug: string) => {
  const res = await api.get(`/products/${slug}`);
  const p = res.data;
  return {
    data: {
      id: p.id,
      title: p.name || p.title,
      price: p.price,
      images: (p.images || []).map((im: any) => im.url),
      description: p.description,
      hasPendant: p.hasPendant || false,
      pendantOptions: p.pendantOptions || [],
      raw: p,
    },
  };
};
export default api;
