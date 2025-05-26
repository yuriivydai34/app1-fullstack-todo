import { jest } from '@jest/globals';
import { Sequelize } from 'sequelize-typescript';
import TodoRepository from './todo.repository';
import Todo from '../models/todo.model';

let sequelize: Sequelize;

beforeAll(async () => {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
    models: [Todo]
  });
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('TodoRepository', () => {
  beforeEach(async () => {
    await Todo.destroy({ where: {}, truncate: true });
  });

  it('should save todo', async () => {
    const todoData = { text: 'text1', status: 'undone' };
    const createdTodo = await Todo.create(todoData);
    
    expect(createdTodo.text).toBe(todoData.text);
    expect(createdTodo.status).toBe(todoData.status);
  });

  it('should retrieve all todos', async () => {
    const todos = [
      { text: 'Todo 1', status: 'undone' },
      { text: 'Todo 2', status: 'completed' }
    ];

    await Todo.bulkCreate(todos);
    const foundTodos = await TodoRepository.retrieveAll({});
    
    expect(foundTodos.length).toBe(2);
    expect(foundTodos[0].text).toBe(todos[0].text);
    expect(foundTodos[1].text).toBe(todos[1].text);
  });

  it('should update todo', async () => {
    const todo = await Todo.create({ text: 'Original', status: 'undone' });
    const updatedData = { id: todo.id, text: 'Updated', status: 'completed' };
    
    await TodoRepository.update(updatedData as Todo);
    const updatedTodo = await Todo.findByPk(todo.id);
    
    expect(updatedTodo?.text).toBe('Updated');
    expect(updatedTodo?.status).toBe('completed');
  });

  it('should delete todo', async () => {
    const todo = await Todo.create({ text: 'To Delete', status: 'undone' });
    await TodoRepository.delete(todo.id!);
    
    const deletedTodo = await Todo.findByPk(todo.id);
    expect(deletedTodo).toBeNull();
  });
});