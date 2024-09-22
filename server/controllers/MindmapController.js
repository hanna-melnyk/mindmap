//server/controllers/MindmapController.js
import {Mindmap, Node} from "../models/Mindmap.js";


export const createMindmap = async (req, res) => {
    console.log('Request received to create a new mindmap');
    try {
        const newMindmap = new Mindmap({
            title: 'Untitled', // Default title or get from req.body
            nodes: []
        });

        const savedMindmap = await newMindmap.save();
        console.log(`Mindmap created with ID: ${savedMindmap._id}`);

        res.status(201).json({ id: savedMindmap._id });
    } catch (error) {
        console.error('Error creating mindmap:', error.message);
        res.status(500).json({ message: 'Error creating mindmap' });
    }
};

export const getMindmapById = async (req, res) => {
    const { id } = req.params;

    try {
        console.log(`Fetching mindmap with ID: ${id}`);
        const mindmap = await Mindmap.findById(id);

        if (!mindmap) {
            console.log(`Mindmap with ID ${id} not found`);
            return res.status(404).json({ message: 'Mindmap not found' });
        }

        console.log(`Mindmap with ID ${id} fetched successfully`);
        res.status(200).json(mindmap);
    } catch (error) {
        console.error(`Error fetching mindmap with ID ${id}:`, error.message);
        res.status(500).json({ message: 'Error fetching mindmap' });
    }
};

export const updateMindmapTitle = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    try {
        const mindmap = await Mindmap.findById(id);

        if (!mindmap) {
            return res.status(404).json({ message: 'Mindmap not found' });
        }

        // Update the title
        mindmap.title = title;
        await mindmap.save();

        console.log(`Mindmap with ID ${id} updated successfully`);
        res.status(200).json({ message: 'Mindmap updated successfully' });
    } catch (error) {
        console.error('Error updating mindmap:', error);
        res.status(500).json({ message: 'Error updating mindmap' });
    }
};



export const addNodeToMindmap = async (req, res) => {
    const { mindmapId } = req.params;
    const { text } = req.body;

    try {
        // Create a new node
        const newNode = new Node({ text });
        await newNode.save();

        // Find the mindmap and add the node
        const mindmap = await Mindmap.findById(mindmapId);
        mindmap.nodes.push(newNode._id); // Link the node to the mindmap
        await mindmap.save();

        res.status(201).json(newNode); // Return the new node data
    } catch (error) {
        console.error('Error adding node to mindmap:', error);
        res.status(500).json({ message: 'Error adding node to mindmap' });
    }
};