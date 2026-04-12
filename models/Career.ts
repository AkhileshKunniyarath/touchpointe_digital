import { models, model } from "mongoose";
import { createContentSchema } from "./shared";

const careerSchema = createContentSchema({
  location: { type: String, required: true },
  employmentType: { type: String, required: true },
  department: { type: String, required: true },
  salaryRange: { type: String, default: "" },
});


careerSchema.index({ department: 1 });

const Career = models.Career || model("Career", careerSchema);
export default Career;
