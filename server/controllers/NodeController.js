//server/controllers/NodeController.js
import  {Mindmap, Node} from '../models/Mindmap.js'

export const getNodeById = async (req, res) => {
    const { nodeId } = req.params;

    try {
        console.log(`Fetching node with ID: ${nodeId}`);
        const node = await Node.findById(nodeId);

        if (!node) {
            console.log(`Node with ID ${nodeId} not found`);
            return res.status(404).json({ message: 'Node not found' });
        }

        console.log(`Node with ID ${nodeId} fetched successfully`);
        res.status(200).json(node);
    } catch (error) {
        console.error(`Error fetching node with ID ${nodeId}:`, error.message);
        res.status(500).json({ message: 'Error fetching node' });
    }
};

export const updateNodeText = async (req, res) => {
    const { mindmapId, nodeId } = req.params;
    const { text } = req.body;

    try {
        // Find the node by its ID and update its text
        const node = await Node.findById(nodeId);

        if (!node) {
            return res.status(404).json({ message: 'Node not found' });
        }

        node.text = text;
        await node.save();

        res.status(200).json({ message: 'Node updated successfully' });
    } catch (error) {
        console.error('Error updating node:', error);
        res.status(500).json({ message: 'Error updating node' });
    }
};


export const addSubnodeToNode = async (req, res) => {
    const { nodeId } = req.params; // ID of the parent node
    const { text } = req.body; // New subnode text

    try {
        // Find the parent node
        const parentNode = await Node.findById(nodeId);
        if (!parentNode) {
            return res.status(404).json({ message: "Parent node not found" });
        }

        // Create the new subnode
        const newSubnode = new Node({ text });
        await newSubnode.save();

        // Add the subnode to the parent node's subnodes array
        parentNode.subnodes.push(newSubnode._id);
        await parentNode.save();

        console.log(`Subnode with ID ${newSubnode._id} added to node with ID ${nodeId}`);
        res.status(201).json(newSubnode);
    } catch (error) {
        console.error("Error adding subnode to node:", error);
        res.status(500).json({ message: "Error adding subnode to node" });
    }
};

// Recursive function to delete node and its subnodes
const deleteNodeRecursively = async (nodeId, mindmapId = null, parentNodeId = null) => {
    try {
        const node = await Node.findById(nodeId);

        if (!node) {
            return; // If the node is not found, just return
        }

        // Recursively delete all subnodes
        if (node.subnodes && node.subnodes.length > 0) {
            for (const subnodeId of node.subnodes) {
                await deleteNodeRecursively(subnodeId, null, nodeId); // Recursive call for each subnode
            }
        }

        // Remove node reference from Mindmap collection if it's a top-level node
        if (mindmapId) {
            await Mindmap.findByIdAndUpdate(mindmapId, {
                $pull: { nodes: nodeId }, // Remove the node from the Mindmap's nodes array
            });
            console.log(`Removed node reference from Mindmap with ID: ${mindmapId}`);
        }

        // Remove subnode reference from the parent node, if applicable
        if (parentNodeId) {
            await Node.findByIdAndUpdate(parentNodeId, {
                $pull: { subnodes: nodeId }, // Remove the subnode reference from parent node
            });
            console.log(`Removed subnode reference from parent node with ID: ${parentNodeId}`);
        }

        // Delete the current node after its subnodes are deleted
        await Node.findByIdAndDelete(nodeId);
        console.log(`Node with ID ${nodeId} and its subnodes deleted successfully`);

    } catch (error) {
        console.error(`Error deleting node with ID ${nodeId}:`, error);
        throw new Error(`Error deleting node with ID ${nodeId}`);
    }
};


export const deleteNodeById = async (req, res) => {
    const { nodeId } = req.params;
    const { mindmapId, parentNodeId } = req.query;

    try {
        // Call the recursive function to delete the node and its subnodes
        await deleteNodeRecursively(nodeId, mindmapId, parentNodeId);
        res.status(200).json({ message: `Node with ID ${nodeId} and its subnodes deleted successfully` });
    } catch (error) {
        console.error("Error deleting node:", error);
        res.status(500).json({ message: "Error deleting node" });
    }
};