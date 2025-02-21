import { Schema, model } from "mongoose";

const categorySchema = Schema ({
    name:{
        type: String,
        required: [true, "Name is required."],
        maxLength: [25, "Name cannot exceed 30 characters."],
        unique: true
    },
},
{
    versionKey: false,
    timeStamps: true
})

export default model("Category", categorySchema)