import {createAction, props} from "@ngrx/store";

export enum ActionTypes {
  SHOW_ERROR = '[Toaster] Show Error Toaster',
  SHOW_INFO = '[Toaster] Show Info Toaster',
  SHOW_SUCCESS = '[Toaster] Show Success Toaster',
}

export const showError = createAction(ActionTypes.SHOW_ERROR, props<{ message: string; }>());
export const showInfo = createAction(ActionTypes.SHOW_INFO, props<{ message: string; }>());
export const showSuccess = createAction(ActionTypes.SHOW_SUCCESS, props<{ message: string; }>());
