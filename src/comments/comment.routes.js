import { Router } from "express";
import { addCommentsValidator, deleteCommentsValidator, updateCommentsValidator } from "../middlewares/comment-validator.js";
import { addComments, deleteComments, updateComments } from "./comment.controller.js";

const router = Router();

router.post("/publication/:id/addComments", addCommentsValidator, addComments)

router.delete("/deleteComments/:id", deleteCommentsValidator, deleteComments)

router.put("/updateComments/:id", updateCommentsValidator, updateComments)
export default router;