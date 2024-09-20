import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {Node} from "./components/Node.jsx";


export const Mindmap = () => {
  const {id} = useParams();
  const [mindmap, setMindmap] = useState({ title: "", nodes: [] });
  const [isEditing, setIsEditing] = useState(!id); //switch between viewing and editing
  const [title, setTitle] = useState('');


    useEffect(() => {
    if (id) {
        const fetchMindmap = async () => {
            try {
                const response = await axios.get(`/mindmaps/${id}`);
                setMindmap(response.data);
                setTitle(response.data.title);
            } catch (error) {
                console.error('Error fetching mindmap:', error);
            }
        };

        fetchMindmap();
    }
    }, [id]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };


    const saveChanges = async () => {
        try {
            const updatedMindmap = { ...mindmap, title };

            if (id) {
                await axios.put(`/api/mindmaps/${id}`, updatedMindmap);
            } else {
                const response = await axios.post("/api/mindmaps", updatedMindmap);
                setMindmap(response.data);
            }

            setIsEditing(false); // Exit edit mode after saving
        } catch (error) {
            console.error('Error saving mindmap:', error);
        }
    };


    if (!mindmap) {
        return <div>Mindmap not found.</div>;
    }

    return (
        <div>
            <h1>{isEditing ? (
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Enter mindmap title"
                />
            ) : (
                mindmap.title || 'Untitled Mindmap'
            )}
            </h1>

            <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Cancel' : 'Edit'}
            </button>

            {isEditing && (
                <button onClick={saveChanges}>
                    Save Changes
                </button>
            )}

            <div>
                {mindmap.nodes.map((node, index) => (
                    <Node key={index} node={node} />
                ))}
            </div>
        </div>
    );

};
