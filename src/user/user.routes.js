import { Router } from "express";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";
import { updatePasswordValidator, updateProfilePictureValidator, updateUserValidator } from "../middlewares/user-validator.js";
import { updateProfilePicture, updateUser } from "./user.controller.js";

const router = Router()

router.put("/updateUser/:uid", updateUserValidator, updateUser);
router.patch("/updateUserPassword/:uid", updatePasswordValidator, updateUser)
router.patch("/updateProfilePicture/:uid", uploadProfilePicture.single("profilePicture"), updateProfilePictureValidator, updateProfilePicture);

export default router