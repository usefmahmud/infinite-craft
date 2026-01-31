import mongoose from "mongoose";

const ElementSchema = new mongoose.Schema({
  word1: String,
  word2: String,
  resultText: String,
  resultEmoji: String,
});

export const ElementModel =
  mongoose.models.Element || mongoose.model("Element", ElementSchema);
