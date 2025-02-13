import { mongoose, Schema } from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true},
    salary: { type: Number, required: true },
    vacancies: { type: Number },
    experience: { type: Number, default: 0 },
    desc: { type: String },
    requirements: { type: String },
    application: [{ type: Schema.Types.ObjectId, ref: "User" }],
    userId: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Jobs = mongoose.model("Jobs", jobSchema);

export default Jobs;
