import { Schema, model, models, Types } from "mongoose";

const commentSchema = new Schema({
  id: {
    type: Types.ObjectId,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
  },
});

const Comment = models.Comment || model("C  omment", commentSchema);

export default Comment;
