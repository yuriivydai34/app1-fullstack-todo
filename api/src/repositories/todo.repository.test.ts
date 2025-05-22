import { jest } from '@jest/globals';
import TodoRepository from './todo.repository';
import Todo from '../models/todo.model';

jest.mock('./todo.repository'); // this happens automatically with automocking

const mockMethod = jest.fn<(todo: Todo) => void>();
const todo = new Todo({id: 1, text: 'text1', status: 'undone'});
jest.mocked(TodoRepository).save((todo: Todo) => {
  return TodoRepository.save(todo);
});

TodoRepository.save(todo);

it('should return data', async () => {
  expect(mockMethod.mock.calls).toBe(todo);
});