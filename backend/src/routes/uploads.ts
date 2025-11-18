import { Router, Request } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

const router = Router();

const uploadsDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (
    _req: Request,
    _file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => cb(null, uploadsDir),
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    const filename = (req.query.filename as string) || file.originalname;
    cb(null, filename);
  },
});

const upload = multer({ storage });

import requireAuth from "../middleware/auth";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Return a mock presigned url and public url
router.post("/", requireAuth, (req, res) => {
  const { filename } = req.body;
  if (!filename) return res.status(400).json({ error: "filename required" });
  const host = req.get("host");
  const protocol = req.protocol;
  const uploadUrl = `${protocol}://${host}/api/uploads/upload?filename=${encodeURIComponent(
    filename
  )}`;
  const publicUrl = `${protocol}://${host}/uploads/${encodeURIComponent(
    filename
  )}`;
  res.json({ uploadUrl, publicUrl });
});

// Endpoint to receive file upload (used as the uploadUrl)
router.post("/upload", requireAuth, upload.single("file"), (req, res) => {
  const filename = (req.query.filename as string) || req.file?.originalname;
  if (!filename) return res.status(400).json({ error: "missing filename" });
  const host = req.get("host");
  const protocol = req.protocol;
  const publicUrl = `${protocol}://${host}/uploads/${encodeURIComponent(
    filename
  )}`;

  // if productId is provided in body, persist image metadata
  const productId = req.body?.productId as string | undefined;
  if (productId) {
    prisma.productImage
      .create({
        data: { productId, url: publicUrl, alt: req.body.alt || null },
      })
      .catch((err) => console.error("prisma image create error", err));
  }
  res.json({ ok: true, publicUrl });
});

export default router;
