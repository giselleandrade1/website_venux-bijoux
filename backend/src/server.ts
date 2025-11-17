import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import productRoutes from "./routes/products";
import uploadRoutes from "./routes/uploads";
import adminRoutes from "./routes/admin";
import orderRoutes from "./routes/orders";
import path from "path";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);

// Serve uploaded files from /uploads
app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));

app.get("/health", (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on ${port}`));
