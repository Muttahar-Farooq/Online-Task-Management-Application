import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

export default mongoose.model('User', userSchema);