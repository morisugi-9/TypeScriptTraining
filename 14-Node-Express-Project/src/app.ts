// const express =require('express'); // commonjs
import express from "express"; // ES
import { json } from "body-parser";

import todoRouter from "./routes/todos";

const app = express();

app.use(json());

app.use("/todos", todoRouter);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ message: err.message });
  }
);

app.listen(3000);
