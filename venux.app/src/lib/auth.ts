import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev";

export interface AuthNextRequest extends NextApiRequest {
  user?: any;
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}

export function getAuthFromReq(req: NextApiRequest) {
  const auth = req.headers.authorization || "";
  if (!auth || !auth.startsWith("Bearer ")) return null;
  const token = auth.split(" ")[1];
  try {
    const payload: any = verifyToken(token as string);
    return { id: payload.sub, role: payload.role || "user" };
  } catch (err) {
    return null;
  }
}

export function requireAuth(handler: any) {
  return async (req: AuthNextRequest, res: NextApiResponse) => {
    const user = getAuthFromReq(req as NextApiRequest);
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    req.user = user;
    return handler(req, res);
  };
}

export function requireAdmin(handler: any) {
  return requireAuth((req: AuthNextRequest, res: NextApiResponse) => {
    if (!req.user || req.user.role !== "admin")
      return res.status(403).json({ error: "Forbidden - admin only" });
    return handler(req, res);
  });
}
