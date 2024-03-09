import express from "express";
import dotenv from "dotenv";
import { HealthRouter } from "./api/router/HealthRouter.js";
import { ProductsRouter } from "./api/router/ProductsRouter.js";
dotenv.config();

const healthRouter = new HealthRouter();
const productsRouter = new ProductsRouter();

const app = express();

app.use("/", healthRouter.getRouter());
app.use("/", productsRouter.getRouter());

const PORT = process.env.PORT || 8080;

const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server up and running in http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
