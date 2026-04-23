import mongoose from "mongoose";

const holdingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
    stockId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
    quantity: { type: Number, default: 0 },
    avgBuyPrice: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

holdingSchema.index({ userId: 1, stockId: 1 }, { unique: true });

export const Holding = mongoose.model("Holding", holdingSchema);
