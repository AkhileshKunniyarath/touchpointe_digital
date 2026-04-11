import { model, models } from "mongoose";

import { createContentSchema } from "@/models/shared";

const blogSchema = createContentSchema({
  author: {
    type: String,
    required: true
  },
  readTime: {
    type: Number,
    default: 4
  }
});

const Blog = models.Blog || model("Blog", blogSchema);

export default Blog;

