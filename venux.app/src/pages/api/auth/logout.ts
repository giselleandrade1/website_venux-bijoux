import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../_lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(400).json({ error: "Missing refresh token" });
  try {
    await prisma.refreshToken.updateMany({
      where: { token: refreshToken },
      data: { revoked: true },
    });
    res.status(204).end();
  } catch (err) {
    console.error("logout error", err);
    res.status(500).json({ error: "Could not logout" });
  }
}
