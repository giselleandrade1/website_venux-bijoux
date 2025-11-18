import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../_lib/prisma";
import { requireAdmin } from "../../_lib/auth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string };

  if (req.method === "PATCH") {
    // update role
    return requireAdmin(async (r: any, s: any) => {
      const { role } = req.body;
      if (!role) return s.status(400).json({ error: "role required" });
      try {
        const user = await prisma.user.update({
          where: { id },
          data: { role },
        });
        try {
          await prisma.auditLog.create({
            data: {
              action: "update_user_role",
              actorId: r.user?.id || null,
              meta: { userId: user.id, newRole: user.role },
            },
          });
        } catch (auditErr) {
          console.warn("audit log failed", auditErr);
        }
        return s.json({
          user: { id: user.id, email: user.email, role: user.role },
        });
      } catch (err) {
        console.error("admin update role error", err);
        return s.status(400).json({ error: "Could not update role" });
      }
    })(req, res as any);
  }

  if (req.method === "DELETE") {
    return requireAdmin(async (r: any, s: any) => {
      try {
        const deleted = await prisma.user.delete({ where: { id } });
        try {
          await prisma.auditLog.create({
            data: {
              action: "delete_user",
              actorId: r.user?.id || null,
              meta: { userId: deleted.id, email: deleted.email },
            },
          });
        } catch (auditErr) {
          console.warn("audit log failed", auditErr);
        }
        return s.status(204).end();
      } catch (err) {
        console.error("admin delete user error", err);
        return s.status(400).json({ error: "Could not delete user" });
      }
    })(req, res as any);
  }

  res.setHeader("Allow", ["PATCH", "DELETE"]);
  return res.status(405).end();
}

export default handler;
