//client/src/pages/components/Node.jsx
import React, {useState} from "react";


export const Node = ({node, level = 0, isEditing, onUpdateNode}) => {
    const [nodeText, setNodeText] = useState(node.text);

    const handleTextChange = (e) => {
        const updatedText = e.target.value;
        setNodeText(updatedText);
        if (onUpdateNode) {
            onUpdateNode({ ...node, text: updatedText });
        }
    };

    return (
        <div style={{ marginLeft: level * 20 + "px", marginTop: "10px" }}>
            <div>
                {isEditMode ? (
                    <input
                        type="text"
                        value={nodeText}
                        onChange={handleTextChange}
                        placeholder="Enter node text"
                    />
                ) : (
                    <span style={{ fontWeight: "bold" }}>{node.text}</span>
                )}
                <span> - {node.done ? "Done" : "Not Done"}</span>
            </div>
            {node.subnodes && node.subnodes.length > 0 && (
                <div>
                    {node.subnodes.map((subnode, index) => (
                        <Node
                            key={index}
                            node={subnode}
                            level={level + 1}
                            isEditMode={isEditing}
                            onUpdateNode={onUpdateNode}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};