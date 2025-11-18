import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { prisma } from "../_lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev";

function makeAccessToken(user: any) {
  return jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "15m",
  });
}

function makeRefreshToken(user: any) {
  return jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();
  const { name, email, password, role } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Missing fields" });
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name: name || null, email, password: hash, role: role || "user" },
    });
    const accessToken = makeAccessToken(user);
    const refreshToken = makeRefreshToken(user);
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000),
      },
    });
    res
      .status(201)
      .json({
        user: { id: user.id, email: user.email, role: user.role },
        accessToken,
        refreshToken,
      });
  } catch (err: any) {
    console.error("register error", err);
    res.status(400).json({ error: err?.message || "Could not register" });
  }
}
