import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../_lib/prisma";
import { requireAuth } from "../_lib/auth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query as { slug: string };
  if (req.method === "GET") {
    try {
      const p = await prisma.product.findUnique({
        where: { slug },
        include: { images: true, variants: true },
      });
      if (!p) return res.status(404).json({ error: "Not found" });
      return res.json(p);
    } catch (err) {
      console.error("Prisma error", err);
      return res.status(500).json({ error: "server error" });
    }
  }

  if (req.method === "PUT") {
    return requireAuth(async (r: any, s: any) => {
      try {
        const p = await prisma.product.update({
          where: { slug },
          data: req.body,
        });
        return s.json(p);
      } catch (err) {
        console.error("Prisma update error", err);
        return s.status(404).json({ error: "Not found or could not update" });
      }
    })(req, res as any);
  }

  if (req.method === "DELETE") {
    return requireAuth(async (r: any, s: any) => {
      try {
        await prisma.product.delete({ where: { slug } });
        return s.status(204).send();
      } catch (err) {
        console.error("Prisma delete error", err);
        return s.status(404).json({ error: "Not found or could not delete" });
      }
    })(req, res as any);
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  return res.status(405).end();
}

export default handler;
