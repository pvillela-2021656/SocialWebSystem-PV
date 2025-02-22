import Category from "./category.model.js";

export const defaultCategory = async() => {
    try{
        const category = await Category.findOne({ name: "DEFAULT"});
        if(!category){
            //console.log("Default category is already created.");
            return;
        }
            await Category.create({
                name: "Default Category"
            })
            
            //console.log("Default category was created.")
        
    }catch(err){
        //console.log("Couldnt make the default category.")
        //error: err.message
    }
}

export default defaultCategory;