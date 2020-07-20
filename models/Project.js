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
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collaborator",
      // required: true,
    },
  },
  { timestamps: true }
);

const projectModel = mongoose.model("Project", projectSchema);
// {name: 'my first project',
// collaborators: 'melisa',
// owner: true,}
// );

module.exports = projectModel;
