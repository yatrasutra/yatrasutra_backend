import express from "express";
import { databases, ID } from "../config/appwrite.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const dbId = process.env.APPWRITE_DATABASE_ID;
const collectionId = process.env.APPWRITE_ENQUIRY_COLLECTION_ID; 

// 📨 Create a new enquiry
router.post("/", async (req, res) => {
  try {
    const doc = await databases.createDocument(
      dbId,
      collectionId,
      ID.unique(),
      req.body
    );
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📋 List all enquiries
router.get("/", async (req, res) => {
  try {
    const response = await databases.listDocuments(dbId, collectionId);
    res.json(response.documents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔍 Get a specific enquiry by ID
router.get("/:id", async (req, res) => {
  try {
    const doc = await databases.getDocument(dbId, collectionId, req.params.id);
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ Update enquiry (optional)
router.put("/:id", async (req, res) => {
  try {
    const doc = await databases.updateDocument(
      dbId,
      collectionId,
      req.params.id,
      req.body
    );
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🗑️ Delete enquiry
router.delete("/:id", async (req, res) => {
  try {
    await databases.deleteDocument(dbId, collectionId, req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
