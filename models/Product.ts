import { model, models } from "mongoose";

import { createContentSchema } from "@/models/shared";

const productSchema = createContentSchema({
  launchStage: {
    type: String,
    default: "Discovery"
  },
  benefits: {
    type: [String],
    default: []
  },
  stack: {
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
  }
});

const Product = models.Product || model("Product", productSchema);

export default Product;

