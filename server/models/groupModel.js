import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String },
  }, { _id: false });

const groupSchema = mongoose.Schema({
    name: String,
    members: [memberSchema],
    description: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

export default mongoose.model('Group', groupSchema);