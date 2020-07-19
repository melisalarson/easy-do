const mongoose = require("mongoose");
const Collaborator = require("./Collaborator");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collaborator",
        required: true,
      },
    ],
    owner: Boolean,
  },
  { timestamps: true }
);

const projectModel = mongoose.model("Project", projectSchema);

module.exports = projectModel;
