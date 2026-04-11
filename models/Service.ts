import { model, models } from "mongoose";

import { createContentSchema } from "@/models/shared";

const serviceSchema = createContentSchema({
  icon: {
    type: String,
    default: "Sparkles"
  },
  outcomes: {
    type: [String],
    default: []
  },
  process: {
    type: [String],
    default: []
  },
  ctaLabel: {
    type: String,
    default: ""
  },
  ctaHref: {
    type: String,
    default: ""
  },
  priceFrom: {
    type: String,
    default: ""
  }
});

const Service = models.Service || model("Service", serviceSchema);

export default Service;

