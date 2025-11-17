import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

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

// Register admin (for local/dev only) or regular user
router.post("/register", async (req, res) => {
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
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Missing fields" });
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });
    const accessToken = makeAccessToken(user);
    const refreshToken = makeRefreshToken(user);
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000),
      },
    });
    res.json({
      user: { id: user.id, email: user.email, role: user.role },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.error("login error", err);
    res.status(500).json({ error: "server error" });
  }
});

// Refresh endpoint: rotates refresh token
router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(400).json({ error: "Missing refresh token" });
  try {
    const payload: any = jwt.verify(refreshToken, JWT_SECRET);
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
});

// Logout: revoke a refresh token (admin or user can call)
router.post("/logout", async (req, res) => {
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
});

export default router;
