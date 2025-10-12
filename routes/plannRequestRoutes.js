import express from "express";
import { databases, ID } from "../config/appwrite.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const dbId = process.env.APPWRITE_DATABASE_ID;
const collectionId = process.env.APPWRITE_PLANREQUEST_COLLECTION_ID;

// ➕ Create new plan request
router.post("/", async (req, res) => {
  try {
    const doc = await databases.createDocument(dbId, collectionId, ID.unique(), req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📋 List all plan requests
router.get("/", async (req, res) => {
  try {
    const response = await databases.listDocuments(dbId, collectionId);
    res.json(response.documents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🗑️ Delete a plan request (optional)
router.delete("/:id", async (req, res) => {
  try {
    await databases.deleteDocument(dbId, collectionId, req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
