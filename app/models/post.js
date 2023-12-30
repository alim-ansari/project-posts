import { Schema, model, models } from "mongoose";

const postSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  post: {
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

const Post = models.Post || model("Post", postSchema);

export default Post;
