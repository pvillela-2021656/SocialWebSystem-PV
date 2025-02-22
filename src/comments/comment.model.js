import { Schema, model } from "mongoose";

const commentSchema = new Schema({
    text:{
        type: String,
    },
    publication:{
        type: Schema.Types.ObjectId,
        ref: "Publication",
        required: true
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

export default model("Comment", commentSchema)