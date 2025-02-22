import Comment from "./comment.model.js";

export const addComments = async (req, res) =>{
    try{
        const { id } = req.params
        const { text } = req.body
        const comment = new Comment({
            text,
            publication: id,
            creator: req.usuario._id
        }).save();

        const addComment = await Comment.findById(comment._id)
        .populate("publication", "title")
        .populate("creator", "username");

        res.status(200).json({
            success: true,
            message: "Comment successfully created.",
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "There was an error when creating this comment.",
            error: err.message
        })
    }
}

export const deleteComments = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findByIdAndDelete(id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Comment has BEEN deleted.",
            comment,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "There was a mistake at deleting the comment.",
            error: error.message,
        });
    }
};

export const updateComments = async(req, res) =>{
    try{
        const { id} = req.params
        const {text} = req.body

        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found.",
            });
        }
        //Metodo para actualizar y guardar el comentario.
        comment.text = text
        await comment.save();
        //Exito:
        res.status(200).json({
            success: true,
            message: "The comment was updated successfully."
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "There was a mistake at updating the comment."
        })
    }
}