import { model, models, Schema } from "mongoose";

const jobApplicationSchema = new Schema(
  {
    jobId: { type: String, required: true },
    jobTitle: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    coverLetter: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },
    status: {
      type: String,
      enum: ["new", "reviewing", "shortlisted", "rejected"],
      default: "new"
    }
  },
  { timestamps: true }
);

const JobApplication = models.JobApplication || model("JobApplication", jobApplicationSchema);
export default JobApplication;
