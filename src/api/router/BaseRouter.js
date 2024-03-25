import { Router } from "express";

export default class BaseRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }

  // getter del router
  getRouter() {
    return this.router;
  }

  initRoutes() {}

  get(path, ...callbacks) {
    this.router.get(path, this.generateCustomResponses, this.apllyCallbacks(callbacks));
  }

  post(path, ...callbacks) {
    this.router.post(path, this.generateCustomResponses, this.apllyCallbacks(callbacks));
  }

  put(path, ...callbacks) {
    this.router.put(path, this.generateCustomResponses, this.apllyCallbacks(callbacks));
  }

  delete(path, ...callbacks) {
    this.router.delete(path, this.generateCustomResponses, this.apllyCallbacks(callbacks));
  }

  generateCustomResponses(req, res, next) {
    // mensaje custom para respuestas success true con mensaje
    res.sendSuccess = (status, message) => {
      res.status(status).json({
        success: true,
        message,
      });
    };

    // mensaje custom para respuesta success true con payload
    res.sendSuccessWithPayload = (status, payload) => {
      res.status(status).json({
        success: true,
        payload,
      });
    };

    next();
  }

  apllyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, [...params]);
      } catch (error) {
        params[1].json({
          success: false,
          error: error.message,
        });
      }
    });
  }
}
