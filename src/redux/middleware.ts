import { Dispatch, Middleware, MiddlewareAPI } from "redux";
import { WhennerState } from ".";
import { TODO_ACTION_PREFIX } from "./common/actions";
import { beginLoad } from "./common/actions/beginLoad";
import { loadTodos } from "./todos/actions/loadTodos";

export const logger: Middleware = () => (next: Dispatch) => action => {
  console.log("Action Dispatched", action);
  return next(action);
};

export function autoDispatcher(
  condition: (action: any) => boolean,
  actionCreator: () => any
): Middleware {
  const result: Middleware = ({
    dispatch
  }: MiddlewareAPI<Dispatch, WhennerState>) => (next: Dispatch) => action => {
    if (condition(action)) {
      const autoAction = actionCreator();
      console.debug("autoDispatcher dispatch", { action, autoAction });
      dispatch(autoAction);
    } else {
      console.debug("autoDispatcher, nothing to dispatch", action);
    }
    return next(action);
  };

  return result;
}

export const thunkCounter = autoDispatcher(
  action => typeof action === "function",
  beginLoad
);

export const reloadTodosOnUpsertSuccess = autoDispatcher(
  action =>
    action.type.startsWith(TODO_ACTION_PREFIX) &&
    !action.type.startsWith(TODO_ACTION_PREFIX + "Load."),
  loadTodos
);
