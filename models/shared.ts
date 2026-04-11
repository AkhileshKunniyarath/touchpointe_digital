import { Schema } from "mongoose";

export const contentSchemaFields = {
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  summary: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  tags: {
    type: [String],
    default: []
  },
  coverImage: {
    type: String,
    default: ""
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft"
  },
  seoTitle: {
    type: String,
    default: ""
  },
  seoDescription: {
    type: String,
    default: ""
  },
  publishedAt: {
    type: Date
  }
};

export const contentSchemaOptions = {
  timestamps: true
};

export function createContentSchema(extraFields: Record<string, unknown>) {
  const schema = new Schema(
    {
      ...contentSchemaFields,
      ...extraFields
    },
    contentSchemaOptions
  );

  schema.index({ status: 1, publishedAt: -1 });
  schema.index({ category: 1 });

  return schema;
}
