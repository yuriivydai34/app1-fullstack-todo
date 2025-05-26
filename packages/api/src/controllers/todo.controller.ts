import { Request, Response } from "express";
import Todo from "../models/todo.model";
import todoRepository from "../repositories/todo.repository";

export default class TodoController {
  async create(req: Request, res: Response) {
    if (!req.body.text) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const todo: Todo = req.body;
      if (!todo.status) todo.status = 'undone';

      const savedTodo = await todoRepository.save(todo);

      res.status(201).send(savedTodo);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving todos."
      });
    }
  }

  async findAll(req: Request, res: Response) {
    const text = typeof req.query.text === "string" ? req.query.text : "";

    try {
      const todos = await todoRepository.retrieveAll({ text });

      res.status(200).send(todos);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving todos."
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const todo = await todoRepository.retrieveById(id);

      if (todo) res.status(200).send(todo);
      else
        res.status(404).send({
          message: `Cannot find Todo with id=${id}.`
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving Todo with id=${id}.`
      });
    }
  }

  async update(req: Request, res: Response) {
    let todo: Todo = req.body;
    todo.id = parseInt(req.params.id);

    try {
      const num = await todoRepository.update(todo);

      if (num == 1) {
        res.send({
          message: "Todo was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Todo with id=${todo.id}. Maybe Todo was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating Todo with id=${todo.id}.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const num = await todoRepository.delete(id);

      if (num == 1) {
        res.send({
          message: "Todo was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Todo with id=${id}. Maybe Todo was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete Todo with id==${id}.`
      });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const num = await todoRepository.deleteAll();

      res.send({ message: `${num} Todos were deleted successfully!` });
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while removing all todos."
      });
    }
  }

  async findAllCompleted(req: Request, res: Response) {
    try {
      const todos = await todoRepository.retrieveAll({ status: true });

      res.status(200).send(todos);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving todos."
      });
    }
  }
}
