import type { NextApiRequest, NextApiResponse } from "next";
import { requireAuth } from "../_lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();
  return requireAuth(async (r: any, s: any) => {
    const { filename } = req.body;
    if (!filename) return s.status(400).json({ error: "filename required" });
    const host = r.headers.host;
    const protocol = process.env.VERCEL_URL
      ? `https`
      : (r.headers["x-forwarded-proto"] as string) || "http";
    const uploadUrl = `${protocol}://${host}/api/uploads/upload?filename=${encodeURIComponent(
      filename
    )}`;
    const publicUrl = `${protocol}://${host}/uploads/${encodeURIComponent(
      filename
    )}`;
    return s.json({ uploadUrl, publicUrl });
  })(req, res);
}
