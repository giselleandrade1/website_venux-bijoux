import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/src/lib/prisma";
import { requireAuth } from "@/src/lib/auth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
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
      return res.json({
        data: products,
        meta: { page: 1, limit: products.length, total: products.length },
      });
    } catch (err) {
      console.error("Prisma error", err);
      return res.json({ data: [], meta: { page: 1, limit: 0, total: 0 } });
    }
  }

  if (req.method === "POST") {
    // protected - create product
    return requireAuth(async (r: any, s: any) => {
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
        return s.status(201).json(created);
      } catch (err) {
        console.error("Prisma create error", err);
        return s.status(400).json({ error: "Could not create" });
      }
    })(req, res as any);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end();
}

export default handler;
