import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Schema for nodes with recursive subnodes
const nodeSchema = new mongoose.Schema({
    text: { type: String, required: true },
    done: { type: Boolean, default: false },
    color: { type: String, default: '#FFFFFF' }, // Default color is white
    subnodes: [{
        type: Schema.Types.ObjectId,
        ref: 'Node' // Reference to other nodes to allow recursion
    }]
}, { timestamps: true }); // automatic createdAt, updatedAt timestamps



// Define the Mindmap.jsx schema
const mindmapSchema = new mongoose.Schema({
    title: { type: String, required: true },
    nodes: [{ type: Schema.Types.ObjectId, ref: 'Node' }], // Top-level nodes
    progress: { type: Number, default: 0 }, // Percentage of nodes marked as done
    // isPrivate: { type: Boolean, default: false }, // For private mindmaps
    // owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // comments: [{
    //     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    //     text: { type: String, required: true },
    //     createdAt: { type: Date, default: Date.now }
    // }],
}, { timestamps: true });

// Helper function to count total nodes, including subnodes
const countTotalNodes = (nodes) => {
    let count = 0;
    for (let node of nodes) {
        count++;
        if (node.subnodes && node.subnodes.length > 0) {
            count += countTotalNodes(node.subnodes);
        }
    }
    return count;
};

// Helper function to count completed nodes, including subnodes
const countDoneNodes = (nodes) => {
    let count = 0;
    for (let node of nodes) {
        if (node.done) count++;
        if (node.subnodes && node.subnodes.length > 0) {
            count += countDoneNodes(node.subnodes);
        }
    }
    return count;
};

// Method to calculate the progress of done nodes in the mindmap
mindmapSchema.methods.updateProgress = async function () {
    const nodes = await this.populate('nodes').execPopulate();

    const totalNodes = countTotalNodes(nodes);
    const doneNodes = countDoneNodes(nodes);

    this.progress = totalNodes === 0 ? 0 : (doneNodes / totalNodes) * 100;
    return this.save();
};


export const Mindmap = mongoose.model('Mindmap', mindmapSchema);
export const Node = mongoose.model('Node', nodeSchema);