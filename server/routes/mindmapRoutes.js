//server/routes/mindmapRoutes.js

import express from "express";
import {createMindmap, updateMindmap} from "../controllers/MindmapController.js";

const router = express.Router();

router.post('/', createMindmap);
router.put('/:id', updateMindmap);

export default router;