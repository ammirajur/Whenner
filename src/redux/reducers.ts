import { ITodo } from "../models/Todo";
import { defaultSettings, Settings } from "../models/Settings";
import { schedule } from "../models/schedule";
import { WhennerAction } from "./actions/WhennerAction";
import { WhennerActionType } from "./actions/WhennerActionType";

export function todos(
  state: ITodo[] = [],
  { dayStart: startTime, dayEnd: endTime }: Settings,
  action: WhennerAction
) {
  let result = state;
  switch (action.type) {
    case WhennerActionType.CreateTodo:
      result = [...state, Object.assign({}, action.todo)];
      break;
    case WhennerActionType.UpdateTodo:
      result = state.map(todo =>
        todo.id === action.todo.id ? Object.assign({}, action.todo) : todo
      );
      break;
    default:
      break;
  }

  return schedule({ dayStart: startTime, dayEnd: endTime }, ...result);
}

export function settings(
  state: Settings = defaultSettings,
  action: WhennerAction
) {
  return state;
}
