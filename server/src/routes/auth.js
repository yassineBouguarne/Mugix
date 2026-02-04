import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const payload = { email, role: "admin" };
  const token = jwt.sign(payload, process.env.JWT_SECRET || "secret", {
    expiresIn: "8h",
  });

  return res.json({ token, user: { email, isAdmin: true } });
});

export default router;
