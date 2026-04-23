import express from "express";
import { Holding } from "../models/Holding.js";
import { Portfolio } from "../models/Portfolio.js";

export const portfolioRouter = express.Router();

portfolioRouter.get("/:userId", async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.params.userId });
    const holdings = await Holding.find({ userId: req.params.userId });

    return res.json({
      portfolio: portfolio || { userId: req.params.userId, totalValue: 0 },
      holdings
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to fetch portfolio", error: error.message });
  }
});

portfolioRouter.get("/:userId/holdings", async (req, res) => {
  try {
    const holdings = await Holding.find({ userId: req.params.userId });
    return res.json(holdings);
  } catch (error) {
    return res.status(500).json({ message: "Unable to fetch holdings", error: error.message });
  }
});

portfolioRouter.post("/holdings/upsert", async (req, res) => {
  try {
    const { userId, stockId, quantity, avgBuyPrice, totalValue } = req.body;

    const holding = await Holding.findOneAndUpdate(
      { userId, stockId },
      { quantity, avgBuyPrice, lastUpdated: new Date() },
      { upsert: true, new: true }
    );

    const portfolio = await Portfolio.findOneAndUpdate(
      { userId },
      { totalValue, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    return res.status(201).json({ portfolio, holding });
  } catch (error) {
    return res.status(500).json({ message: "Unable to upsert holding", error: error.message });
  }
});
