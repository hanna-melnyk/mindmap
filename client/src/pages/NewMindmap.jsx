//client/src/pages/NewMindmap.jsx
import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



export const NewMindmap = () => {
const navigate = useNavigate();

    useEffect(() => {
        let isRequestSent = false;
        const createMindMap = async () => {
            if (isRequestSent) return;  // Prevent duplicate requests
            isRequestSent = true;
            try {
                const response = await axios.post('/api/mindmaps/new');
                const data = response.data;
                // Navigate to the mindmap with the new id
                navigate(`/mindmaps/${data.id}`, { replace: true });
            } catch (error) {
                console.error('Failed to create mindmap:', error);
            }
        };

    createMindMap();

        // Cleanup function to reset the flag
        return () => {
            isRequestSent = false;
        };

}, [navigate]);

    return (
        <div>
            <h1>Creating Mindmap...</h1>
        </div>
    );

};