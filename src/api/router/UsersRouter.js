import { POLICIES } from "../globals/policies.js";
import UsersService from "../services/users.service.js";
import BaseRouter from "./BaseRouter.js";
const usersService = new UsersService();

export class UsersRouter extends BaseRouter {
  initRoutes() {
    this.get("/", [POLICIES.AUTH], this.getUsers);
    this.get("/:id", [POLICIES.AUTH], this.getUserById);
    this.post("/", [POLICIES.PUBLIC], this.createUser);
    this.delete("/:id", [POLICIES.AUTH], this.deleteUser);
  }

  async getUsers(req, res) {
    const users = await usersService.getAll();
    res.sendSuccessWithPayload(200, users);
  }

  async getUserById(req, res) {
    const user = await usersService.getById(req.params.id);
    res.sendSuccessWithPayload(200, user);
  }

  async createUser(req, res) {
    const user = await usersService.save(req.body);
    res.sendSuccessWithPayload(200, user);
  }

  async deleteUser(req, res) {
    const userId = await usersService.deleteById(req.params.id);
    res.sendSuccess(200, `Product ${userId} deleted`);
  }
}
