import { Router } from "express";
import requireAuth from "../middleware/auth";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// GET /api/products?q=search
router.get("/", async (req, res) => {
  const q = (req.query.q as string) || "";
  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
        ],
      },
      include: { images: true, variants: true },
      take: 100,
    });
    res.json({
      data: products,
      meta: { page: 1, limit: products.length, total: products.length },
    });
  } catch (err) {
    console.error("Prisma error", err);
    // fallback to empty list
    res.json({ data: [], meta: { page: 1, limit: 0, total: 0 } });
  }
});

// GET /api/products/:slug
router.get("/:slug", async (req, res) => {
  const slug = req.params.slug;
  try {
    const p = await prisma.product.findUnique({
      where: { slug },
      include: { images: true, variants: true },
    });
    if (!p) return res.status(404).json({ error: "Not found" });
    res.json(p);
  } catch (err) {
    console.error("Prisma error", err);
    res.status(500).json({ error: "server error" });
  }
});

// Protected admin routes - create product
router.post("/", requireAuth, async (req, res) => {
  const body = req.body;
  try {
    const created = await prisma.product.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description || null,
        price: Number(body.price) || 0,
      },
    });
    res.status(201).json(created);
  } catch (err) {
    console.error("Prisma create error", err);
    res.status(400).json({ error: "Could not create" });
  }
});

router.put("/:slug", requireAuth, async (req, res) => {
  const slug = req.params.slug;
  try {
    const p = await prisma.product.update({ where: { slug }, data: req.body });
    res.json(p);
  } catch (err) {
    console.error("Prisma update error", err);
    res.status(404).json({ error: "Not found or could not update" });
  }
});

router.delete("/:slug", requireAuth, async (req, res) => {
  const slug = req.params.slug;
  try {
    await prisma.product.delete({ where: { slug } });
    res.status(204).send();
  } catch (err) {
    console.error("Prisma delete error", err);
    res.status(404).json({ error: "Not found or could not delete" });
  }
});

export default router;
