import express from "express";

const app = express();

app.listen(8080, () => {
  console.log(`app inicializada en el puerto ${8080}`);
});
