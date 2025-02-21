import { Schema, model } from "mongoose";

const publicationSchema = new Schema({
    title:{
        type: String,
        unique: true,
        required: [true, "Title of the publication IS required."]
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text:{
        type: String,
        required: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

export default model("Publication", publicationSchema)