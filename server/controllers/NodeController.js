//server/controllers/NodeController.js
import  {Node} from '../models/Mindmap.js'

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