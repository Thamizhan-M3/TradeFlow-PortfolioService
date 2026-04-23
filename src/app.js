import cors from "cors";
import express from "express";
import { portfolioRouter } from "./routes/portfolioRoutes.js";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ service: "tradeflow-portfolio-service", status: "ok" });
  });

  app.use("/api/portfolio", portfolioRouter);

  return app;
}
