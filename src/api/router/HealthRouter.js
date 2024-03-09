import BaseRouter from "./BaseRouter.js";

export class HealthRouter extends BaseRouter {
  initRoutes() {
    this.get("/health", this.healthCheck);
  }

  async healthCheck(req, res) {
    res.status(200).json({
      success: true,
      health: "up",
      message: "Server's health up",
    });
  }
}
