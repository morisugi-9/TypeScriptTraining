"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodos = exports.updateTodos = exports.getTodos = exports.createTodo = void 0;
const todo_1 = __importDefault(require("../models/todo"));
const TODOS = [];
const createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = new todo_1.default(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({ message: 'TODOを作成しました。', createdTodo: newTodo });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    res.json({ message: 'TODOを表示します。', getTodos: TODOS });
};
exports.getTodos = getTodos;
const updateTodos = (req, res, next) => {
    const id = req.params.id;
    const updateText = req.body.text;
    const todoIndex = TODOS.findIndex(todo => todo.id === id);
    if (todoIndex > 0) {
        throw new Error('対象のデータが見つかりませんでした。');
    }
    TODOS[todoIndex] = new todo_1.default(id, updateText);
    res.json({ message: 'TODOを更新しました。', updatedTodos: TODOS });
};
exports.updateTodos = updateTodos;
const deleteTodos = (req, res, next) => {
    const id = req.params.id;
    const todoIndex = TODOS.findIndex(todo => todo.id === id);
    if (todoIndex > 0) {
        throw new Error('対象のデータが見つかりませんでした。');
    }
    TODOS.splice(todoIndex, 1);
    res.json({ message: 'TODOを削除しました。', deletedTodos: TODOS });
};
exports.deleteTodos = deleteTodos;
