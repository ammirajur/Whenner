import { ITodo } from "../models/Todo";
import { Chronotype } from "../models/Chronotype";
import { schedule } from "../models/schedule";

export const TODOS_KEY = "Whenner.Todos";

export const defaultTodos: ITodo[] = [
  {
    id: 1,
    title: "Get started with Whenner",
    description: "Click stuff, learn how the app works",
    estimate: 5,
    start: new Date(),
    done: false
  }
];

async function readTodos(): Promise<ITodo[]> {
  return JSON.parse(localStorage.getItem(TODOS_KEY) || "null") || defaultTodos;
}

async function writeTodos(todos: ITodo[]): Promise<ITodo[]> {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  return todos;
}

export class TodosService {
  private async update(todo: ITodo): Promise<ITodo | undefined> {
    const todos = await this.all();
    const existing = todos.find(t => t.id === todo.id);
    if (existing) {
      todos[todos.indexOf(existing)] = { ...todo };
      await writeTodos(schedule(this.chronotype, ...todos));
      return await this.byId(todo.id);
    }
  }

  private async insert(todo: ITodo): Promise<ITodo> {
    const existing = await this.byId(todo.id);
    if (existing) {
      throw new Error(
        `Cannot insert todo with ID ${todo.id} because it already exists`
      );
    }
    const todos = await this.all();
    const insertTodo = { ...todo, id: Date.now() };
    todos.push(insertTodo);
    await writeTodos(schedule(this.chronotype, ...todos));
    return await this.byId(insertTodo.id) || insertTodo;
  }

  constructor(public chronotype: Chronotype) {

  }

  async upsert(todo: ITodo): Promise<ITodo> {
    return (await this.update(todo)) || (await this.insert(todo));
  }

  async byId(id: number): Promise<ITodo | undefined> {
    return (await this.byIds(id))[0];
  }

  async byIds(...ids: number[]): Promise<ITodo[]> {
    const todos = await this.all();
    const result = ids.map(id => todos.find(todo => todo.id === id)) || [];
    return result.filter(Boolean) as ITodo[];
  }

  async all() {
    return schedule(this.chronotype, ...await readTodos());
  }
}