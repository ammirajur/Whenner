import { AnyAction } from "redux";

export const TASK_ACTION_PREFIX = "Task.";
export const ACTION_SUCCESS_SUFFIX = ".Success"

export enum WhennerActionType {
  // Common Actions
  BeginLoad = "BeginLoad",
  // Todo Actions
  InsertTaskSuccess = "Task.Insert.Success",
  UpdateTaskSuccess = "Task.Upsert.Success",
  LoadTasksSuccess = "Task.Load.Success"
}

export interface WhennerAction extends AnyAction {
  readonly type: WhennerActionType;
}