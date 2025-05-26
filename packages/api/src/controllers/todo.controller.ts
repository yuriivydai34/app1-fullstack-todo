import { Request, Response } from "express";
import { TodoService } from "../services/todo.service";

export class TodoController {
  private todoService: TodoService;

  constructor() {
    this.todoService = new TodoService();
  }

  create = async (req: Request, res: Response) => {
    console.log('[Controller] Create todo request:', req.body);
    try {
      const savedTodo = await this.todoService.createTodo(req.body);
      res.status(201).send(savedTodo);
    } catch (err: any) {
      console.error('[Controller] Error creating todo:', err);
      res.status(err.message.includes("empty") ? 400 : 500).send({
        message: err.message || "Some error occurred while creating the Todo."
      });
    }
  }

  findAll = async (req: Request, res: Response) => {
    console.log('[Controller] Find all todos request, query:', req.query);
    try {
      const text = req.query.text as string;
      const todos = await this.todoService.getAllTodos(text);
      res.send(todos);
    } catch (err: any) {
      console.error('[Controller] Error retrieving todos:', err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving todos."
      });
    }
  }

  findOne = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    console.log('[Controller] Find one todo request, id:', id);

    try {
      const todo = await this.todoService.getTodoById(id);
      res.send(todo);
    } catch (err: any) {
      console.error('[Controller] Error retrieving todo:', err);
      res.status(err.message.includes("Cannot find") ? 404 : 500).send({
        message: err.message || `Error retrieving Todo with id=${id}`
      });
    }
  }

  update = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    console.log('[Controller] Update todo request, id:', id, 'data:', req.body);

    try {
      await this.todoService.updateTodo(id, req.body);
      res.send({
        message: "Todo was updated successfully."
      });
    } catch (err: any) {
      console.error('[Controller] Error updating todo:', err);
      res.status(err.message.includes("Cannot find") ? 404 : 500).send({
        message: err.message || `Error updating Todo with id=${id}`
      });
    }
  }

  delete = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    console.log('[Controller] Delete todo request, id:', id);

    try {
      await this.todoService.deleteTodo(id);
      res.send({
        message: "Todo was deleted successfully!"
      });
    } catch (err: any) {
      console.error('[Controller] Error deleting todo:', err);
      res.status(err.message.includes("Cannot find") ? 404 : 500).send({
        message: err.message || `Could not delete Todo with id=${id}`
      });
    }
  }

  deleteAll = async (req: Request, res: Response) => {
    console.log('[Controller] Delete all todos request');
    try {
      const count = await this.todoService.deleteAllTodos();
      res.send({
        message: `${count} Todos were deleted successfully!`
      });
    } catch (err: any) {
      console.error('[Controller] Error deleting all todos:', err);
      res.status(500).send({
        message: err.message || "Some error occurred while removing all todos."
      });
    }
  }

  findAllCompleted = async (req: Request, res: Response) => {
    console.log('[Controller] Find all completed todos request');
    try {
      const todos = await this.todoService.getCompletedTodos();
      res.send(todos);
    } catch (err: any) {
      console.error('[Controller] Error retrieving completed todos:', err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving completed todos."
      });
    }
  }
}
