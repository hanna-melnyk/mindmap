//server/routes/mindmapRoutes.js

import express from "express";
import {updateMindmapTitle} from "../controllers/MindmapController.js";
import {createMindmap, getMindmapById, addNodeToMindmap} from "../controllers/MindmapController.js";
import {getNodeById, updateNodeText, addSubnodeToNode} from "../controllers/NodeController.js";

const router = express.Router();

router.post('/new', createMindmap);
router.get('/:id', getMindmapById);

// PUT route to update the mindmap title
router.put('/:id', updateMindmapTitle);
// router.post('/:id', updateMindmap);




/*Nodes-----------------------------------------------------------*/
// get a node by its ID
router.get('/nodes/:nodeId', getNodeById);
// Route to add a new node to mindmap
router.post('/:mindmapId/nodes', addNodeToMindmap);

router.put('/:mindmapId/nodes/:nodeId', updateNodeText);

router.post('/nodes/:nodeId/subnodes', addSubnodeToNode);

export default router;