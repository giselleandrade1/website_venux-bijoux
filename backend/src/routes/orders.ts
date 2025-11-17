import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import requireAuth, { AuthRequest } from "../middleware/auth";

const prisma = new PrismaClient();
const router = Router();

// Create order from cart items
router.post("/", requireAuth, async (req: AuthRequest, res) => {
  const { items, total, shipping, paymentMethod } = req.body;
  const userId = req.user?.id;
  if (!items || !Array.isArray(items) || items.length === 0)
    return res.status(400).json({ error: "No items" });
  try {
    const order = await prisma.order.create({
      data: {
        userId: userId || undefined,
        total: Number(total) || 0,
        shipping: shipping || undefined,
        paymentMethod: paymentMethod || undefined,
        items: {
          create: items.map((it: any) => ({
            productVariantId: it.id,
            quantity: Number(it.quantity) || 1,
            price: Number(it.price) || 0,
            configJson: it.configJson || undefined,
          })),
        },
      },
      include: { items: true },
    });
    res.status(201).json({ orderId: order.id, items: order.items });
  } catch (err) {
    console.error("create order error", err);
    res.status(500).json({ error: "Could not create order" });
  }
});

export default router;
