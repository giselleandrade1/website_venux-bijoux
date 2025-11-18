import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../_lib/prisma";
import { requireAdmin } from "../../_lib/auth";
import bcrypt from "bcrypt";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return requireAdmin(async (r: any, s: any) => {
      try {
        const users = await prisma.user.findMany({
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true,
          },
        });
        return s.json({ users });
      } catch (err) {
        console.error("admin list users error", err);
        return s.status(500).json({ error: "server error" });
      }
    })(req, res as any);
  }

  if (req.method === "POST") {
    return requireAdmin(async (r: any, s: any) => {
      const { name, email, password, role } = req.body;
      if (!email || !password)
        return s.status(400).json({ error: "Missing fields" });
      try {
        const hash = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
          data: {
            name: name || null,
            email,
            password: hash,
            role: role || "user",
          },
        });
        try {
          await prisma.auditLog.create({
            data: {
              action: "create_user",
              actorId: r.user?.id || null,
              meta: { userId: user.id, email: user.email },
            },
          });
        } catch (auditErr) {
          console.warn("audit log failed", auditErr);
        }
        return s
          .status(201)
          .json({
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
            },
          });
      } catch (err: any) {
        console.error("admin create user error", err);
        return s
          .status(400)
          .json({ error: err?.message || "Could not create user" });
      }
    })(req, res as any);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end();
}

export default handler;
