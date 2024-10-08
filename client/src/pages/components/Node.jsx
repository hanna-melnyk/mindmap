//client/src/pages/components/Node.jsx
import React, {useState, useEffect} from "react";
import axios from 'axios';

export const Node = ({ nodeId, mindmapId, text, onNodeSave, onDelete, parentNodeId }) => {
    const [nodeText, setNodeText] = useState(text || '');
    const [isSaving, setIsSaving] = useState(false);
    const [subnodes, setSubnodes] = useState([]);


    // Handler for when input changes
    const handleChange = (e) => {
        setNodeText(e.target.value);
    };

    // Handler for when input loses focus (onBlur)
    const handleBlur = async () => {
        console.log(`Saving node text... New text: "${nodeText}"`);
        console.log(`mindmapId: ${mindmapId}, nodeId: ${nodeId}`);
        setIsSaving(true);
        try {
            // Send a PUT request to update the node text
            await axios.put(`/api/mindmaps/${mindmapId}/nodes/${nodeId}`, { text: nodeText });
            console.log(`Node with ID ${nodeId} updated successfully with new text: "${nodeText}"`);
        } catch (error) {
            console.error('Error saving node text:', error);
        } finally {
            setIsSaving(false);
        }
    };


    // Fetch the node by its ID after it has been created
    useEffect(() => {
        const fetchNode = async () => {
            if (!nodeId) return; // Only fetch if nodeId is available

            console.log(`Fetching node with ID: ${nodeId}`);
            try {
                const response = await axios.get(`/api/mindmaps/nodes/${nodeId}`);
                const node = response.data;
                setNodeText(node.text);
                setSubnodes(node.subnodes || []); // Set subnodes
                console.log(`Node with ID ${node._id} fetched successfully`);
            } catch (error) {
                console.error("Error fetching node:", error);
            }
        };

        fetchNode();
    }, [nodeId]); // This effect runs when nodeId is updated


    // Handler to add a subnode
    const addNewSubnode = async () => {
        try {
            const response = await axios.post(
                `/api/mindmaps/${mindmapId}/nodes`,
                { text: "New Subnode" }
            );
            const newNode = response.data;
            setSubnodes([...subnodes, newNode]); // add new subnode to state
            console.log(`Subnode created with ID ${newNode._id}`);
        } catch (error) {
            console.error("Error creating subnode:", error);
        }
    };

    // Handler to delete the current node
    const deleteNode = async () => {
        try {
            // Send a DELETE request, passing mindmapId or parentNodeId
            await axios.delete(`/api/mindmaps/nodes/${nodeId}`, {
                params: {
                    mindmapId: mindmapId, // Use this if it's a top-level node
                    parentNodeId: parentNodeId // Use this if it's a subnode
                }
            });
            console.log(`Node with ID ${nodeId} deleted successfully`);
            onDelete(nodeId); // Inform the parent component about the deletion
        } catch (error) {
            console.error("Error deleting node:", error);
        }
    };

    return (
        <div style={{marginLeft: nodeId ? '20px' : '0px'}}>
            <input
                type="text"
                value={nodeText}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter node text"
            />
            {isSaving && <p>Saving...</p>}
            <button onClick={addNewSubnode}>Add Subnode</button>
            <button onClick={deleteNode}>Delete this Node</button>

            <div className="subnodes">
                {subnodes.map((subnode) => (
                    <Node
                        key={subnode._id}
                        nodeId={subnode._id}
                        mindmapId={mindmapId}
                        parentNodeId={nodeId}
                        text={subnode.text}
                        onNodeSave={onNodeSave}
                        onDelete={onDelete} // // onDelete prop referring to the handleNodeDelete function passed down from the Mindmap to Node.
                    />
                ))}
            </div>
        </div>
    );
};

