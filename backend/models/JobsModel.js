import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    Title: { type: String, required: true},
    Type: { type: String, required: true},
    location: { type: String, required: true },
    salary: { type: Number, required: true},
    vacancies: { type: Number },
    experience: { type: Number, default: 0 },
    detail: [{ desc: { type: String }, requirements: { type: String } }],
    application: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  },
  { timestamps: true }
);

const Jobs = mongoose.model("Jobs", jobSchema);

export default Jobs;
