import {createAction, props} from "@ngrx/store";
import {SuccessActionProps} from "./interfaces/actions/success-action-props.interface";
import {FailureActionProps} from "./interfaces/actions/failure-action-props.interface";
import {RequestActionProps} from "./interfaces/actions/request-action-props.interface";
import {GetProductsDTO} from "../shared/dto/get-products.dto";
import {AddProductDTO} from "../shared/dto/add-product.dto";
import {CreateProductDTO} from "../shared/dto/create-product.dto";

export enum ActionTypes {
  GET_USER_POLAR_CHART = '[User] Get User Polar Chart Request',
  GET_USER_POLAR_CHART_SUCCESS = '[User] Get User Polar Chart Success Response',
  GET_USER_POLAR_CHART_FAILURE = '[User] Get User Polar Chart Failure Response',

  GET_USER_BAR_CHART = '[User] Get User Bar Chart Request',
  GET_USER_BAR_CHART_SUCCESS = '[User] Get User Bar Chart Success Response',
  GET_USER_BAR_CHART_FAILURE = '[User] Get User Bar Chart Failure Response',

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

  GET_CATEGORIES = '[Category] Get Categories Request',
  GET_CATEGORIES_SUCCESS = '[Category] Get Categories Success Response',
  GET_CATEGORIES_FAILURE = '[Category] Get Categories Failure Response',

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

  REMOVE_USER_PRODUCT = '[User] Remove User Product Request',
  REMOVE_USER_PRODUCT_SUCCESS = '[User] Remove User Product Success Response',
  REMOVE_USER_PRODUCT_FAILURE = '[User] Remove User Product Failure Response',

  UPDATE_PROFILE = '[User] Update Profile Request',
  UPDATE_PROFILE_SUCCESS = '[User] Update Profile Success Response',
  UPDATE_PROFILE_FAILURE = '[User] Update Profile Failure Response',

  ADD_PRODUCT = '[User] Add Product Request',
  ADD_PRODUCT_SUCCESS = '[User] Add Product Success Response',
  ADD_PRODUCT_FAILURE = '[User] Add Product Failure Response',
}

export const addProduct = createAction(ActionTypes.ADD_PRODUCT, props<RequestActionProps<CreateProductDTO>>())
export const addProductSuccess = createAction(
  ActionTypes.ADD_PRODUCT_SUCCESS,
  props<SuccessActionProps<any>>()
);
export const addProductFailure = createAction(
  ActionTypes.ADD_PRODUCT_FAILURE,
  props<FailureActionProps>(),
);

export const getCategories = createAction(ActionTypes.GET_CATEGORIES)
export const getCategoriesSuccess = createAction(
  ActionTypes.GET_CATEGORIES_SUCCESS,
  props<SuccessActionProps<any>>()
);
export const getCategoriesFailure = createAction(
  ActionTypes.GET_CATEGORIES_FAILURE,
  props<FailureActionProps>(),
);

export const getUserPolarChart = createAction(ActionTypes.GET_USER_POLAR_CHART, props<RequestActionProps<any>>())
export const getUserPolarChartSuccess = createAction(
  ActionTypes.GET_USER_POLAR_CHART_SUCCESS,
  props<SuccessActionProps<any>>(),
);
export const getUserPolarChartFailure = createAction(
  ActionTypes.GET_USER_POLAR_CHART_FAILURE,
  props<FailureActionProps>(),
);
export const getUserBarChart = createAction(ActionTypes.GET_USER_BAR_CHART, props<RequestActionProps<any>>())
export const getUserBarChartSuccess = createAction(
  ActionTypes.GET_USER_BAR_CHART_SUCCESS,
  props<SuccessActionProps<any>>(),
);
export const getUSerBarChartFailure = createAction(
  ActionTypes.GET_USER_BAR_CHART_FAILURE,
  props<FailureActionProps>(),
);
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

export const getProducts = createAction(ActionTypes.GET_PRODUCTS, props<RequestActionProps<GetProductsDTO>>())
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

export const removeUserProduct = createAction(ActionTypes.REMOVE_USER_PRODUCT, props<RequestActionProps<any>>());
export const removeUserProductSuccess = createAction(
  ActionTypes.REMOVE_USER_PRODUCT_SUCCESS,
  props<SuccessActionProps<any>>(),
);
export const removeUserProductFailure = createAction(
  ActionTypes.REMOVE_USER_PRODUCT_FAILURE,
  props<FailureActionProps>(),
);

export const updateProfile = createAction(ActionTypes.UPDATE_PROFILE, props<RequestActionProps<any>>());
export const updateProfileSuccess = createAction(
  ActionTypes.UPDATE_PROFILE_SUCCESS,
  props<SuccessActionProps<any>>(),
);
export const updateProfileFailure = createAction(
  ActionTypes.UPDATE_PROFILE_FAILURE,
  props<FailureActionProps>(),
);
