import Category from "../category/category.model.js"
import Publication from "./publication.model.js"

export const addPublication = async (req, res) => {
    try {
        const data = req.body
        const category = await Category.findOne({ category: data.category })
        if(!category){
            return res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }
        const publication = new Publication({
            ...data,
            category: category._id,
            creator: req.usuario._id
        })
        await publication.save();
        const userPost = await Publication.findById(publication._id).populate("creator", "username")

        res.status(200).json({
            success: true,
            message: "The publication was created successfully:",
            userPost
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "The post was not created.",
            error: err.message
        })
    }
}

export const deletePublication = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Publication.findByIdAndDelete(id)
        //Encontrar la publicación.
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Publication not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Post has been deleted successfully."
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Couldnt delete this publication.",
            error: err.message
        })
    }
}

export const updatePublication = async (req, res) =>{
    try{
        const { id } = req.params
        const { ...data } = req.body

        const post = await Publication.findByIdAndUpdate(id, data, {new: true})
        if(!post) {
            //Encontrar la publicación para actualizar.
            return res.status(400).json({
                success: false,
                message: "Didnt find the publication.",
                
            })
        }
        res.status(200).json({
            success: true,
            message: "Publication was SUCCESSFULLY updated."
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Couldnt update this publication."
        })
    }
}