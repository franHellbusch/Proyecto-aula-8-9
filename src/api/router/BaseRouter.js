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
    this.router.get(path, this.apllyCallbacks(callbacks));
  }

  post(path, ...callbacks) {
    this.router.post(path, this.apllyCallbacks(callbacks));
  }

  put(path, ...callbacks) {
    this.router.put(path, this.apllyCallbacks(callbacks));
  }

  delete(path, ...callbacks) {
    this.router.delete(path, this.apllyCallbacks(callbacks));
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
