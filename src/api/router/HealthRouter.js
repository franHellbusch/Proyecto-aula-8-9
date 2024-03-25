import { POLICIES } from "../globals/policies.js";
import BaseRouter from "./BaseRouter.js";

export class HealthRouter extends BaseRouter {
  initRoutes() {
    this.get("/health", [POLICIES.NO_AUTH], this.healthCheck);
  }

  async healthCheck(req, res) {
    res.status(200).json({
      success: true,
      health: "up",
      message: "Server's health up",
    });
  }
}
