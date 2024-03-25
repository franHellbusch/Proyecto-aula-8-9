import { POLICIES } from "../globals/policies.js";
import ProductsService from "../services/products.service.js";
import BaseRouter from "./BaseRouter.js";
const productsService = new ProductsService();

export class ProductsRouter extends BaseRouter {
  initRoutes() {
    this.get("/", [POLICIES.NO_AUTH], this.getProducts);
    this.get("/:id", [POLICIES.NO_AUTH], this.getProductById);
    this.post("/", [POLICIES.AUTH], this.createProduct);
    this.delete("/:id", [POLICIES.AUTH], this.deleteProduct);
  }

  async getProducts(req, res) {
    const products = await productsService.getAll();
    res.sendSuccessWithPayload(200, products);
  }

  async getProductById(req, res) {
    const product = await productsService.getById(req.params.id);
    res.sendSuccessWithPayload(200, product);
  }

  async createProduct(req, res) {
    const product = await productsService.save(req.body);
    res.sendSuccessWithPayload(200, product);
  }

  async deleteProduct(req, res) {
    const productId = await productsService.deleteById(req.params.id);
    res.sendSuccess(200, `Product ${productId} deleted`);
  }
}
