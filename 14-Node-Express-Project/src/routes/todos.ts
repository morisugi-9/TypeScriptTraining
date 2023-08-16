import { Router } from "express";
// const express = require('express);
// const Router = require('express.Router');

import { createTodo, deleteTodos, getTodos, updateTodos } from "../controllers/todos";

const router = Router();

router.post("/", createTodo);
router.get("/", getTodos);
router.patch("/:id", updateTodos);
router.delete("/:id", deleteTodos);

export default router;
