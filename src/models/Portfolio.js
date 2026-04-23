import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true, index: true },
    totalValue: { type: Number, default: 0 },
    updatedAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

export const Portfolio = mongoose.model("Portfolio", portfolioSchema);
