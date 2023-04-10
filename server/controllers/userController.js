import User from "../models/userModal.js";

export const getUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const users = await User.findById(userId);
        res.status(200).json({username: users.username, email: users.email});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

