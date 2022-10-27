import mongoose from "mongoose";

const { Schema } = mongoose;

const tutorialSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  cover: { type: String, required: true },
  slug: { type: String, required: true },
  steps: { type: Array, required: true },
});

const Tutorial =
  mongoose.models.Tutorial || mongoose.model("Tutorial", tutorialSchema);

export default Tutorial;
