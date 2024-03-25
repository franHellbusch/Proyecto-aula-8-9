import express from "express";
import dotenv from "dotenv";
import { HealthRouter } from "./api/router/HealthRouter.js";
import { ProductsRouter } from "./api/router/ProductsRouter.js";
import { MongoConnect } from "./api/db/mongodb.js";
import { UsersRouter } from "./api/router/UsersRouter.js";
dotenv.config();

const healthRouter = new HealthRouter();
const productsRouter = new ProductsRouter();
const usersRouter = new UsersRouter();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", healthRouter.getRouter());
app.use("/products", productsRouter.getRouter());
app.use("/users", usersRouter.getRouter());

const PORT = process.env.PORT || 8080;

const start = async () => {
  try {
    await MongoConnect();
    app.listen(PORT, () => {
      console.log(`Server up and running in http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
