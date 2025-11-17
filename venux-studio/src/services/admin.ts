import api, {
  getProducts as fetchProducts,
  getProduct as fetchProduct,
} from "./api";

export const requestUpload = async (filename: string) => {
  const res = await api.post("/uploads", { filename });
  return res.data;
};

export const createProduct = async (payload: any) => {
  // map frontend `title` to backend `name`
  const body = { ...payload };
  if (body.title) {
    body.name = body.title;
    delete body.title;
  }
  const res = await api.post("/products", body);
  return res.data;
};

export const updateProduct = async (slug: string, payload: any) => {
  const body = { ...payload };
  if (body.title) {
    body.name = body.title;
    delete body.title;
  }
  const res = await api.put(`/products/${slug}`, body);
  return res.data;
};

export const getProducts = async (q?: string) => {
  return fetchProducts(q);
};

export const getProduct = async (slug: string) => {
  const res = await fetchProduct(slug);
  return res.data;
};

// --- Admin user management ---
export const listUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data.users;
};

export const createUserAdmin = async (payload: {
  name?: string;
  email: string;
  password: string;
  role?: string;
}) => {
  const res = await api.post("/admin/users", payload);
  return res.data.user;
};

export const updateUserRole = async (id: string, role: string) => {
  const res = await api.patch(`/admin/users/${id}/role`, { role });
  return res.data.user;
};

export const deleteUserAdmin = async (id: string) => {
  const res = await api.delete(`/admin/users/${id}`);
  return res.status === 204;
};
