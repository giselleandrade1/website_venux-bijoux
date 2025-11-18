import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import formidable from "formidable";
import { requireAuth } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadsDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();
  // require auth first
  return requireAuth(async (r: any, s: any) => {
    const filenameQuery = (req.query.filename as string) || undefined;
    const form = new formidable.IncomingForm({ multiples: false });
    form.parse(req as any, async (err, fields, files) => {
      if (err) {
        console.error("formidable parse error", err);
        return s.status(400).json({ error: "Could not parse upload" });
      }
      // handle base64 payload
      if (fields?.contentBase64 && filenameQuery) {
        const buf = Buffer.from(fields.contentBase64 as string, "base64");
        const outPath = path.join(uploadsDir, filenameQuery);
        fs.writeFileSync(outPath, buf);
        const host = r.headers.host;
        const protocol = process.env.VERCEL_URL
          ? `https`
          : (r.headers["x-forwarded-proto"] as string) || "http";
        const publicUrl = `${protocol}://${host}/uploads/${encodeURIComponent(
          filenameQuery
        )}`;
        // optional productId
        const productId = fields.productId as string | undefined;
        if (productId) {
          prisma.productImage
            .create({
              data: {
                productId,
                url: publicUrl,
                alt: (fields.alt as string) || null,
              },
            })
            .catch((e) => console.error("prisma image create error", e));
        }
        return s.json({ ok: true, publicUrl });
      }

      // handle file field
      const file = files?.file as any;
      const filename = filenameQuery || file?.originalFilename || file?.name;
      if (!filename) return s.status(400).json({ error: "missing filename" });
      const tempPath = file?.filepath || file?.path;
      const dest = path.join(uploadsDir, filename);
      try {
        fs.copyFileSync(tempPath, dest);
      } catch (copyErr) {
        console.error("file move error", copyErr);
        return s.status(500).json({ error: "Could not save file" });
      }
      const host = r.headers.host;
      const protocol = process.env.VERCEL_URL
        ? `https`
        : (r.headers["x-forwarded-proto"] as string) || "http";
      const publicUrl = `${protocol}://${host}/uploads/${encodeURIComponent(
        filename
      )}`;
      const productId = fields.productId as string | undefined;
      if (productId) {
        prisma.productImage
          .create({
            data: {
              productId,
              url: publicUrl,
              alt: (fields.alt as string) || null,
            },
          })
          .catch((e) => console.error("prisma image create error", e));
      }
      return s.json({ ok: true, publicUrl });
    });
  })(req, res as any);
}
