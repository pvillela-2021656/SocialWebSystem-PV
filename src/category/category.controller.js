import Category from "./category.model.js";

export const addCategory = async (req, res)=>{
    try{
        const data = req.body
        const category = new Category({
            ...data,
        })

        await category.save();
        res.status(200).json({
            success: true,
            message: "Category succesfully created.",
            category
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Couldnt add the category.",
            error: err.message
        })
    }
}

export const listCategories = async (req, res) => {
    try{
        const{ limit=10, from=0} = req.query
        const query = {}

        const [total, categories] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
                .skip(Number(from))
                .limit(Number(limit))
        ])
        return res.status(200).json({
            success: true,
            total,
            categories
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Couldnt get the list of categories.",
            error: err.message
        })
    }
}

export const updateCategory = async(req, res) => {
    try{
        const { id } = req.params;
        const data = req.body;

        const updatedCategory = await Category.findByIdAndUpdate(id, data, {new: true});
        res.status(200).json({
            success: true,
            message: "Category was updated.",
            category: updatedCategory
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Couldnt update the category.",
            error: err.message
        })
    }
}

export const deleteCategory = async(req, res) => {
    try{
        const { id } = req.params

        await Category.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "Category was deleted."
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Couldnt delete the category",
            error: err.message
        })
    }
}