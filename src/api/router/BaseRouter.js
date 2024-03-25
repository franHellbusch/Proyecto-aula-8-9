import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { POLICIES } from "../globals/policies.js";

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

  get(path, policiesType, ...callbacks) {
    this.router.get(
      path,
      this.generateCustomResponses,
      authMiddleware,
      this.handlePolicies(policiesType),
      this.apllyCallbacks(callbacks)
    );
  }

  post(path, policiesType, ...callbacks) {
    this.router.post(
      path,
      this.generateCustomResponses,
      authMiddleware,
      this.handlePolicies(policiesType),
      this.apllyCallbacks(callbacks)
    );
  }

  put(path, policiesType, ...callbacks) {
    this.router.put(
      path,
      this.generateCustomResponses,
      authMiddleware,
      this.handlePolicies(policiesType),
      this.apllyCallbacks(callbacks)
    );
  }

  delete(path, policiesType, ...callbacks) {
    this.router.delete(
      path,
      this.generateCustomResponses,
      authMiddleware,
      this.handlePolicies(policiesType),
      this.apllyCallbacks(callbacks)
    );
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

  handlePolicies = (policiesArray = []) => {
    return (req, res, next) => {
      try {
        const user = req.user;

        // cuando la ruta no tiene autorizacion
        if (policiesArray.includes(POLICIES.NO_AUTH)) return next();

        // cuando la ruta es publica pero el usuario esta autenticado (no tiene que pasar)
        if (policiesArray.includes(POLICIES.PUBLIC) && user)
          throw new Error("No estas autorizado a entra a esta ruta (publica)");
        // cuando la ruta es publica pero el usuario no esta autenticado(puede pasar)
        if (policiesArray.includes(POLICIES.PUBLIC) && !user) return next();

        // la ruta es privada, se verifica que exista el usuario
        if (!user) throw new Error("No estas autorizado a entra a esta ruta (privada)");

        // se deja pasar al usuario
        next();
      } catch (error) {
        res.status(400).json({
          success: false,
          error: error.message,
        });
      }
    };
  };

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
