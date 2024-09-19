import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    mindmaps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mindmap' }],
});

export const User = mongoose.model('User', userSchema);