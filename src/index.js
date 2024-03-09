import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

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
