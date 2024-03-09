import BaseRouter from "./BaseRouter.js";

export class ProductsRouter extends BaseRouter {
  initRoutes() {
    this.get("/products", this.getProducts);
  }

  async getProducts(req, res) {
    res.status(200).json({
      success: true,
      payload: [
        {
          title: "titulo1",
        },
      ],
    });
  }
}
