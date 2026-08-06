import express from "express";
import upload from "../middlewares/multer.js";
import { protect } from "../middlewares/authMiddleware.js"; // your existing JWT middleware
import {
  savePdf,
  getSavedPdfs,
  deleteSavedPdf,
} from "../controllers/savedPdfController.js";

const router = express.Router();

router.post("/", protect, upload.single("pdf"), savePdf);
router.get("/", protect, getSavedPdfs);
router.delete("/:id", protect, deleteSavedPdf);

export default router;