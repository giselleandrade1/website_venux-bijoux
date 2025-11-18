import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../_lib/prisma";
import { requireAuth, AuthNextRequest } from "../_lib/auth";

async function handler(req: AuthNextRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  return requireAuth(async (r: any, s: any) => {
    const { items, total, shipping, paymentMethod } = req.body;
    const userId = r.user?.id;
    if (!items || !Array.isArray(items) || items.length === 0)
      return s.status(400).json({ error: "No items" });
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
      return s.status(201).json({ orderId: order.id, items: order.items });
    } catch (err) {
      console.error("create order error", err);
      return s.status(500).json({ error: "Could not create order" });
    }
  })(req, res);
}

export default handler;
