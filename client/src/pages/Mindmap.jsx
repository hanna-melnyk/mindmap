//client/src/pages/Mindmap.jsx
import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {Node} from "./components/Node.jsx";

export const Mindmap = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const [nodes, setNodes] = useState([]); // Store the nodes of the mindmap


    // Handler for when input changes
    const handleChange = (e) => {
        setTitle(e.target.value);

    };

    // Handler for when input loses focus (onBlur)
    const handleTitleBlur = async () => {
        console.log(`Saving mindmap title... New title: "${title}"`);
        setIsSaving(true);
        try {
            // Send a PUT request to update the mindmap title
            await axios.put(`/api/mindmaps/${id}`, { title });
            console.log(`Mindmap with ID ${id} updated successfully with new title: "${title}"`)

        } catch (error) {
            console.error('Error saving mindmap title:', error);
        } finally {
            setIsSaving(false);
            console.log('Saving completed.');
        }
    };

    // Handler for adding a new node
    const addNewNode = async () => {
        try {
            const response = await axios.post(`/api/mindmaps/${id}/nodes`, { text: 'New Node' });
            const newNode = response.data;
            setNodes([...nodes, newNode]); // Add new node to the state
            console.log(`New node created with ID ${newNode._id}`);
        } catch (error) {
            console.error('Error creating new node:', error);
        }
    };

    // Callback function for saving node
    const handleNodeSave = (newNode) => {
        setNodes((prevNodes) =>
            prevNodes.map((node) => (node._id === null ? newNode : node))
        );
    };


    useEffect(() => {
        console.log(`Mindmap component mounted with ID: ${id}`);

        // Fetch the mindmap with this id
        const fetchMindmap = async () => {
            console.log(`Fetching mindmap with ID: ${id}`);
            try {
                const response = await axios.get(`/api/mindmaps/${id}`);

                const mindmap = response.data;


                setTitle(mindmap.title);
                setNodes(mindmap.nodes || []); // Fetch associated nodes

                console.log(`Mindmap with ID ${mindmap._id} fetched successfully`);
            } catch (error) {
                console.error('Error fetching mindmap:', error);
            }
        };

        fetchMindmap();
    }, [id]);

    return (
        <div>
            <h1>Mindmap</h1>
            <input
                type="text"
                value={title}
                onChange={handleChange}
                onBlur={handleTitleBlur}
            />
            {isSaving && <p>Saving...</p>}

            <button onClick={addNewNode}>Add Node</button>
            <h2>Nodes</h2>
            {nodes.map((node) => (
                <Node
                    key={node._id || Math.random()} // Use temporary key for new nodes
                    nodeId={node._id}
                    mindmapId={id}
                    text={node.text}
                    onNodeSave={handleNodeSave}
                />
            ))}


        </div>
    );
};