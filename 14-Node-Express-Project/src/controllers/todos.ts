import {RequestHandler} from 'express';

import Todo  from '../models/todo';
import { error } from 'console';

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
    const text = (req.body as {text: string}).text;
    const newTodo = new Todo(Math.random().toString(), text);

    TODOS.push(newTodo);

    res.status(201).json({message: 'TODOを作成しました。', createdTodo: newTodo});
};

export const getTodos: RequestHandler = (req, res, next) => {
    res.json({message: 'TODOを表示します。', getTodos: TODOS})
}

export const updateTodos: RequestHandler<{id: string}> = (req, res, next) => {
    const id = req.params.id;
    const updateText = (req.body as {text: string}).text;
    const todoIndex = TODOS.findIndex(todo => todo.id === id);
    if (todoIndex > 0) {
        throw new Error('対象のデータが見つかりませんでした。');
    }
    TODOS[todoIndex] = new Todo(id, updateText);
    res.json({message: 'TODOを更新しました。', updatedTodos: TODOS});
}

export const deleteTodos: RequestHandler<{id: string}> = (req, res, next) => {
    const id = req.params.id;
    const todoIndex = TODOS.findIndex(todo => todo.id === id);
    if (todoIndex > 0) {
        throw new Error('対象のデータが見つかりませんでした。');
    }
    TODOS.splice(todoIndex, 1);
    res.json({message: 'TODOを削除しました。', deletedTodos: TODOS});
}