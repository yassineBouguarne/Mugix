import express from "express";
import {
  getContacts,
  createContact,
  deleteContact,
} from "../controllers/contactController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", createContact);
router.get("/", requireAuth, getContacts);
router.delete("/:id", requireAuth, deleteContact);

export default router;
