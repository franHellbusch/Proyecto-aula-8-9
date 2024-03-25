import { productModel } from "../models/product.model.js";
import MongoService from "./mongodb/mongo.service.js";

class ProductsService extends MongoService {
  constructor() {
    super(productModel);
  }
}

export default ProductsService;
