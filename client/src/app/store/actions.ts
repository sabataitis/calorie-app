import {createAction, props} from "@ngrx/store";
import {SuccessActionProps} from "./interfaces/actions/success-action-props.interface";
import {FailureActionProps} from "./interfaces/actions/failure-action-props.interface";
import {RequestActionProps} from "./interfaces/actions/request-action-props.interface";

export enum ActionTypes {
  ENTER_PRODUCTS = '[Product] Enter Products Request',
  ENTER_PRODUCTS_SUCCESS = '[Product] Enter Products Success Response',
  ENTER_PRODUCTS_FAILURE = '[Product] Enter Products Failure Response',

  UPDATE_ENTERED_PRODUCT = '[User] Update Product Request',
  UPDATE_ENTERED_PRODUCT_SUCCESS = '[User] Update Product Success Response',
  UPDATE_ENTERED_PRODUCT_FAILURE = '[User] Update Product Failure Response',

  GET_USER_PRODUCTS = '[User] Get Products Request',
  GET_USER_PRODUCTS_SUCCESS = '[User] Get Products Success Response',
  GET_USER_PRODUCTS_FAILURE = '[User] Get Products Failure Response',

  GET_PRODUCTS = '[Product] Get Products Request',
  GET_PRODUCTS_SUCCESS = '[Product] Get Products Success Response',
  GET_PRODUCTS_FAILURE = '[Product] Get Products Failure Response',

  GET_USERNAMES = '[Users] Get Usernames Request',
  GET_USERNAMES_SUCCESS = '[Users] Get Usernames Success Response',
  GET_USERNAMES_FAILURE = '[Users] Get Usernames Failure Response',

  REGISTER = '[Users] Register Request',
  REGISTER_SUCCESS = '[Users] Register Success Response',
  REGISTER_FAILURE = '[Users] Register Failure Response',

  LOGIN = '[Auth] Login Request',
  LOGIN_SUCCESS = '[Auth] Login Success Response',
  LOGIN_FAILURE = '[Auth] Login Failure Response',

  LOGOUT = '[Auth] Logout Request',

  GET_CURRENT_USER = '[Auth] Get Current User Request',
  GET_CURRENT_USER_SUCCESS = '[Auth] Get Current User Success Response',
  GET_CURRENT_USER_FAILURE = '[Auth] Get Current User Failure Response',
}

export const getUsernames = createAction(ActionTypes.GET_USERNAMES)
export const getUsernamesSuccess = createAction(
  ActionTypes.GET_USERNAMES_SUCCESS,
  props<SuccessActionProps<String[]>>(),
);
export const getUsernamesFailure = createAction(
  ActionTypes.GET_USERNAMES_FAILURE,
  props<FailureActionProps>(),
);
export const register = createAction(ActionTypes.REGISTER, props<RequestActionProps<any>>());
export const registerSuccess = createAction(
  ActionTypes.REGISTER_SUCCESS,
  props<SuccessActionProps<any>>()
);
export const registerFailure = createAction(
  ActionTypes.REGISTER_FAILURE,
  props<FailureActionProps>()
);
export const login = createAction(ActionTypes.LOGIN, props<RequestActionProps<any>>());
export const loginSuccess = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<SuccessActionProps<any>>()
);
export const loginFailure = createAction(
  ActionTypes.LOGIN_FAILURE,
  props<FailureActionProps>()
);
export const logout = createAction(ActionTypes.LOGOUT);
export const getCurrentUser = createAction(ActionTypes.GET_CURRENT_USER);
export const getCurrentUserSuccess = createAction(
  ActionTypes.GET_CURRENT_USER_SUCCESS,
  props<SuccessActionProps<any>>()
);
export const getCurrentUserFailure = createAction(
  ActionTypes.GET_CURRENT_USER_FAILURE,
  props<FailureActionProps>()
);

export const getProducts = createAction(ActionTypes.GET_PRODUCTS)
export const getProductsSuccess = createAction(
  ActionTypes.GET_PRODUCTS_SUCCESS,
  props<SuccessActionProps<any>>(),
);
export const getProductsFailure = createAction(
  ActionTypes.GET_PRODUCTS_FAILURE,
  props<FailureActionProps>(),
);

export const getUserProducts = createAction(ActionTypes.GET_USER_PRODUCTS, props<RequestActionProps<any>>())
export const getUserProductsSuccess = createAction(
  ActionTypes.GET_USER_PRODUCTS_SUCCESS,
  props<SuccessActionProps<any>>(),
);
export const getUserProductsFailure = createAction(
  ActionTypes.GET_USER_PRODUCTS_FAILURE,
  props<FailureActionProps>(),
);

export const enterProducts = createAction(ActionTypes.ENTER_PRODUCTS, props<RequestActionProps<any>>());
export const enterProductsSuccess = createAction(
  ActionTypes.ENTER_PRODUCTS_SUCCESS,
  props<SuccessActionProps<any>>(),
);
export const enterProductsFailure = createAction(
  ActionTypes.ENTER_PRODUCTS_FAILURE,
  props<FailureActionProps>(),
);

export const updateEnteredProduct = createAction(ActionTypes.UPDATE_ENTERED_PRODUCT, props<RequestActionProps<any>>());
export const updateEnteredProductSuccess = createAction(
  ActionTypes.UPDATE_ENTERED_PRODUCT_SUCCESS,
  props<SuccessActionProps<any>>(),
);
export const updateEnteredProductFailure = createAction(
  ActionTypes.UPDATE_ENTERED_PRODUCT_FAILURE,
  props<FailureActionProps>(),
);
