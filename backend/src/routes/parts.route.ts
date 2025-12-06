import { Router } from "express";
import { getAllParts, getPartById, createPart, updatePart, deletePart } from "../controllers/parts.controller";

const router = Router();

router.get("/", getAllParts);
router.get("/:id", getPartById);
router.post("/", createPart);
router.put("/:id", updatePart);
router.delete("/:id", deletePart);

export default router;