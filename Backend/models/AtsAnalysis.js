const mongoose = require("mongoose");
const { Schema } = mongoose;

const ATSAnalysisSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },

    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "resume",
      required: true
    },

    jobdesc: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobdesc",
      required: true
    },

    atsScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },

    matchedSkills: {
      type: [String],
      default: []
    },

    missingSkills: {
      type: [String],
      default: []
    },

    suggestions: {
      type: [String],
      default: []
    }
  },{timestamps: true });

module.exports = mongoose.model("AtsAnalysis", ATSAnalysisSchema);