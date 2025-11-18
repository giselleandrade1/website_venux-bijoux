import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { prisma } from "../_lib/prisma";

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
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(400).json({ error: "Missing refresh token" });
  try {
    const payload: any = jwt.verify(refreshToken, JWT_SECRET as string);
    const stored = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });
    if (!stored || stored.revoked)
      return res.status(401).json({ error: "Invalid refresh token" });
    // rotate
    await prisma.refreshToken.update({
      where: { token: refreshToken },
      data: { revoked: true },
    });
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) return res.status(401).json({ error: "Invalid token subject" });
    const newAccess = makeAccessToken(user);
    const newRefresh = makeRefreshToken(user);
    await prisma.refreshToken.create({
      data: {
        token: newRefresh,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000),
      },
    });
    res.json({ accessToken: newAccess, refreshToken: newRefresh });
  } catch (err) {
    console.error("refresh error", err);
    res.status(401).json({ error: "Invalid refresh token" });
  }
}
