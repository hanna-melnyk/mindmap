//server/controllers/MindmapController.js
import {Mindmap} from "../models/Mindmap.js";

export const createMindmap = async (req, res) => {
    try {
        const newMindmap = new Mindmap({
            title: req.body.title,
            nodes: req.body.nodes || [],
            isPrivate: req.body.isPrivate || false,
            createdAt: Date.now(),
        });
        const savedMindmap = await newMindmap.save();
        res.status(201).json(savedMindmap); // 201: Created
    } catch (error) {
        console.error("Error creating mindmap:", error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const updateMindmap = async (req, res) => {
    try {
        const updatedMindmap = await Mindmap.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                nodes: req.body.nodes,
                isPrivate: req.body.isPrivate,
            },
            { new: true } // Returns the updated document
        ).populate('nodes').exec();

        if (!updatedMindmap) {
            return res.status(404).json({ message: 'Mindmap not found' });
        }

        res.json(updatedMindmap);
    } catch (error) {
        console.error("Error updating mindmap:", error);
        res.status(500).json({ message: 'Server error' });
    }
};