import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { body, param, validationResult } from "express-validator";
import requireAuth, { AuthRequest } from "../middleware/auth";
import requireAdmin from "../middleware/requireAdmin";

const prisma = new PrismaClient();
const router = Router();

// All admin routes require an authenticated admin
router.use(requireAuth);
router.use(requireAdmin);

// List users
router.get("/users", async (_req, res) => {
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
    res.json({ users });
  } catch (err) {
    console.error("admin list users error", err);
    res.status(500).json({ error: "server error" });
  }
});

// Create a new user (admin only)
router.post(
  "/users",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  body("name").optional().isString(),
  body("role").optional().isIn(["user", "admin"]),
  async (req: AuthRequest, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { name, email, password, role } = req.body;
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
      // Audit log
      try {
        await prisma.auditLog.create({
          data: {
            action: "create_user",
            actorId: req.user?.id || null,
            meta: { userId: user.id, email: user.email },
          },
        });
      } catch (auditErr) {
        console.warn("audit log failed", auditErr);
      }
      res
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
      res.status(400).json({ error: err?.message || "Could not create user" });
    }
  }
);

// Update user role
router.patch(
  "/users/:id/role",
  param("id").isUUID(),
  body("role").isIn(["user", "admin"]),
  async (req: AuthRequest, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { id } = req.params;
    const { role } = req.body;
    try {
      const user = await prisma.user.update({ where: { id }, data: { role } });
      // Audit log
      try {
        await prisma.auditLog.create({
          data: {
            action: "update_user_role",
            actorId: req.user?.id || null,
            meta: { userId: user.id, newRole: user.role },
          },
        });
      } catch (auditErr) {
        console.warn("audit log failed", auditErr);
      }
      res.json({ user: { id: user.id, email: user.email, role: user.role } });
    } catch (err) {
      console.error("admin update role error", err);
      res.status(400).json({ error: "Could not update role" });
    }
  }
);

// Delete a user
router.delete(
  "/users/:id",
  param("id").isUUID(),
  async (req: AuthRequest, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { id } = req.params;
    try {
      const deleted = await prisma.user.delete({ where: { id } });
      // Audit log
      try {
        await prisma.auditLog.create({
          data: {
            action: "delete_user",
            actorId: req.user?.id || null,
            meta: { userId: deleted.id, email: deleted.email },
          },
        });
      } catch (auditErr) {
        console.warn("audit log failed", auditErr);
      }
      res.status(204).end();
    } catch (err) {
      console.error("admin delete user error", err);
      res.status(400).json({ error: "Could not delete user" });
    }
  }
);

export default router;
