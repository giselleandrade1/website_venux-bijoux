import axios from "axios";
import api from "../api";

describe("api refresh interceptor", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  it("calls refresh endpoint on 401 and retries original request", async () => {
    // prepare stored tokens
    localStorage.setItem("venux:refresh", "old-refresh-token");
    localStorage.setItem("venux:token", "old-access-token");

    // spy on axios.post used by the interceptor to call refresh
    const postSpy = jest
      .spyOn(axios, "post")
      .mockImplementation((url: string, body?: any) => {
        if (typeof url === "string" && url.endsWith("/auth/refresh")) {
          return Promise.resolve({
            data: { accessToken: "new-access", refreshToken: "new-refresh" },
          });
        }
        return Promise.resolve({ data: {} });
      });

    // spy on axios.request used when retrying queued requests (axios(config) calls request)
    const requestSpy = jest
      .spyOn(axios, "request")
      .mockImplementation((config: any) => {
        return Promise.resolve({ data: { ok: true }, config });
      });

    // find the response interceptor rejected handler
    const handlers = (api as any).interceptors.response.handlers as Array<any>;
    const handler = handlers.find((h: any) => typeof h.rejected === "function");
    expect(handler).toBeDefined();

    const originalRequest = { url: "/products", method: "get", headers: {} };
    const err = { response: { status: 401 }, config: originalRequest };

    // call the rejected handler
    const result = handler.rejected(err);
    const res = await result;

    // after refresh, tokens should be updated and original request retried
    expect(postSpy).toHaveBeenCalled();
    expect(requestSpy).toHaveBeenCalled();
    expect(localStorage.getItem("venux:token")).toBe("new-access");
    expect(localStorage.getItem("venux:refresh")).toBe("new-refresh");
    expect(res.data.ok).toBe(true);
  });
});
