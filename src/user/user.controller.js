import fs from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import User from "./user.model.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const updateProfilePicture = async (req, res) => {
    try {
        const { uid } = req.params;
        let newProfilePicture = req.file ? req.file.filename : null;

        if (!newProfilePicture) {
            return res.status(400).json({
                success: false,
                msg: 'Didnt recieve a new profile picture.',
            });
        }

        const user = await User.findById(uid);

        if (user.profilePicture) {
            const oldProfilePicturePath = join(__dirname, "../../public/uploads/profile-pictures", user.profilePicture);
            await fs.unlink(oldProfilePicturePath);
        }

        user.profilePicture = newProfilePicture;
        await user.save();

        res.status(200).json({
            success: true,
            msg: 'Profile picture updated.',
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'There was an error at updating the profile picture.',
            error: err.message
        });
    }
};