import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String },
  }, { _id: false });

const taskSchema = mongoose.Schema({
    title: String,
    description: String,
    assignedTo: memberSchema,
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    dueDate: Date,
    completed: Boolean,
});

export default mongoose.model('Task', taskSchema);