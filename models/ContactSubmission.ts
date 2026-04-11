import { model, models, Schema } from "mongoose";

const contactSubmissionSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    company: {
      type: String,
      default: ""
    },
    serviceInterest: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const ContactSubmission = models.ContactSubmission || model("ContactSubmission", contactSubmissionSchema);

export default ContactSubmission;
