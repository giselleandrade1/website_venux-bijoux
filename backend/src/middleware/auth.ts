import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any;
}

const JWT_SECRET = process.env.JWT_SECRET || "dev";

export function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer "))
    return res.status(401).json({ error: "Unauthorized" });
  const token = auth.split(" ")[1];
  try {
    const payload: any = jwt.verify(token, JWT_SECRET);
    // attach user id and role if present
    req.user = { id: payload.sub, role: payload.role || "user" };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

export default requireAuth;
