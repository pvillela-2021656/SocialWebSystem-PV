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

export const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;

        const updatedUser = await User.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            message: 'User updated.',
            user: updatedUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error at updating the User.',
            error: err.message
        });
    }
};

export const updatePassword = async (req, res) => {
    try {
        const { uid } = req.params;
        const { oldPassword, newPassword } = req.body;

        const findUser = await User.findById(uid);

            if (!findUser) {
                return res.status(404).json({
                    success: false,
                    message: "Didn't find the user.",
                    error: err.message
                });
            }

        const invalidPassword = await verify(user.password, oldPassword);
        if (!invalidPassword) {
            return res.status(400).json({
                success: false,
                message: "Password invalid.",
                error: err.message
            });
        }

        const samePassword = await verify(user.password, newPassword);
        if (samePassword) {
            return res.status(400).json({
                success: false,
                message: "The new password can't be the same as the last one.",
                error: err.message
            });
        }

        const encryptedPassword = await hash(newPassword);
        await User.findByIdAndUpdate(uid, { password: encryptedPassword }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Password was updated.",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "There was an error updating this password.",
            error: err.message
        });
    }
};
