import { model, models } from "mongoose";

import { createContentSchema } from "@/models/shared";

const caseStudySchema = createContentSchema({
  client: {
    type: String,
    required: true
  },
  sector: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  challenge: {
    type: String,
    required: true
  },
  solution: {
    type: String,
    required: true
  },
  results: {
    type: [String],
    default: []
  },
  stack: {
    type: [String],
    default: []
  }
});

const CaseStudy = models.CaseStudy || model("CaseStudy", caseStudySchema);

export default CaseStudy;

