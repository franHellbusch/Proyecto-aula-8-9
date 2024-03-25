import ProductsService from "../services/products.service.js";
import BaseRouter from "./BaseRouter.js";
const productsService = new ProductsService();

export class ProductsRouter extends BaseRouter {
  initRoutes() {
    this.get("/", this.getProducts);
  }

  async getProducts(req, res) {
    const products = await productsService.getAll();
    res.sendSuccessWithPayload(200, products);
  }
}
