import { model, models } from "mongoose";

import { createContentSchema } from "@/models/shared";

const insightSchema = createContentSchema({
  author: {
    type: String,
    required: true
  },
  readTime: {
    type: Number,
    default: 4
  }
});

const Insight = models.Insight || model("Insight", insightSchema);

export default Insight;

