import { Request, Response } from "express";
import Todo from "../models/todo.model";
import todoRepository from "../repositories/todo.repository";

export class TodoController {
  async create(req: Request, res: Response) {
    console.log('[Controller] Create todo request:', req.body);
    try {
      if (!req.body.text) {
        console.log('[Controller] Create todo validation failed: missing text');
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }

      const todo = {
        text: req.body.text,
        status: req.body.status || "undone"
      };

      const savedTodo = await todoRepository.save(todo as Todo);
      console.log('[Controller] Todo created successfully:', savedTodo.toJSON());
      res.status(201).send(savedTodo);
    } catch (err) {
      console.error('[Controller] Error creating todo:', err);
      res.status(500).send({
        message: "Some error occurred while creating the Todo."
      });
    }
  }

  async findAll(req: Request, res: Response) {
    console.log('[Controller] Find all todos request, query:', req.query);
    try {
      const text = req.query.text as string;
      const todos = await todoRepository.retrieveAll({ text });
      console.log('[Controller] Found todos count:', todos.length);
      res.send(todos);
    } catch (err) {
      console.error('[Controller] Error retrieving todos:', err);
      res.status(500).send({
        message: "Some error occurred while retrieving todos."
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    console.log('[Controller] Find one todo request, id:', id);

    try {
      const todo = await todoRepository.retrieveById(id);

      if (todo) {
        console.log('[Controller] Found todo:', todo.toJSON());
        res.send(todo);
      } else {
        console.log('[Controller] Todo not found with id:', id);
        res.status(404).send({
          message: `Cannot find Todo with id=${id}.`
        });
      }
    } catch (err) {
      console.error('[Controller] Error retrieving todo:', err);
      res.status(500).send({
        message: `Error retrieving Todo with id=${id}`
      });
    }
  }

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    console.log('[Controller] Update todo request, id:', id, 'data:', req.body);

    try {
      const todo = {
        id,
        ...req.body
      };

      const num = await todoRepository.update(todo as Todo);

      if (num === 1) {
        console.log('[Controller] Todo updated successfully, id:', id);
        res.send({
          message: "Todo was updated successfully."
        });
      } else {
        console.log('[Controller] Todo not found for update, id:', id);
        res.status(404).send({
          message: `Cannot update Todo with id=${id}. Maybe Todo was not found!`
        });
      }
    } catch (err) {
      console.error('[Controller] Error updating todo:', err);
      res.status(500).send({
        message: `Error updating Todo with id=${id}`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    console.log('[Controller] Delete todo request, id:', id);

    try {
      const num = await todoRepository.delete(id);

      if (num === 1) {
        console.log('[Controller] Todo deleted successfully, id:', id);
        res.send({
          message: "Todo was deleted successfully!"
        });
      } else {
        console.log('[Controller] Todo not found for deletion, id:', id);
        res.status(404).send({
          message: `Cannot delete Todo with id=${id}. Maybe Todo was not found!`
        });
      }
    } catch (err) {
      console.error('[Controller] Error deleting todo:', err);
      res.status(500).send({
        message: `Could not delete Todo with id=${id}`
      });
    }
  }

  async deleteAll(req: Request, res: Response) {
    console.log('[Controller] Delete all todos request');
    try {
      const nums = await todoRepository.deleteAll();
      console.log('[Controller] Deleted todos count:', nums);
      res.send({
        message: `${nums} Todos were deleted successfully!`
      });
    } catch (err) {
      console.error('[Controller] Error deleting all todos:', err);
      res.status(500).send({
        message: "Some error occurred while removing all todos."
      });
    }
  }

  async findAllCompleted(req: Request, res: Response) {
    console.log('[Controller] Find all completed todos request');
    try {
      const todos = await todoRepository.retrieveAll({ status: 'done' });
      console.log('[Controller] Found completed todos count:', todos.length);
      res.send(todos);
    } catch (err) {
      console.error('[Controller] Error retrieving completed todos:', err);
      res.status(500).send({
        message: "Some error occurred while retrieving completed todos."
      });
    }
  }
}
