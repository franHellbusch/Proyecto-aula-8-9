import { UserModel } from "../models/user.model.js";
import MongoService from "./mongodb/mongo.service.js";

class UsersService extends MongoService {
  constructor() {
    super(UserModel);
  }
}

export default UsersService;
