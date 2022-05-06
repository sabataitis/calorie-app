import {
  createReducer,
   on
} from '@ngrx/store';
import {DefaultStateValues} from "../shared/constants/default-state-values.const";
import {State} from "./state";

import {StoreActions} from './index';

export const initialState: State = {
  usernamesState: {...DefaultStateValues, usernames: null},
  userState: {...DefaultStateValues, user: {isAuthenticated: false, _id: null, username: null, gender: null, age:null, height: null, weight: null, activity: null, calories: null}},
  productState: {...DefaultStateValues, products: []}
};

export const StoreReducer = createReducer<State>(
  initialState,

  on(StoreActions.getUsernames, (state: State, _) => ({
    ...state,
    usernamesState: {
      loading: true,
      success: false,
      error: null,
      usernames: null
    }
  })),

  on(StoreActions.getUsernamesSuccess, (state: State, action) => ({
    ...state,
    usernamesState: {
      loading: false,
      success: true,
      error: null,
      usernames: action.response
    }
  })),

  on(StoreActions.getUsernamesFailure, (state: State, action) => ({
    ...state,
    usernamesState: {
      loading: false,
      success: false,
      error: action.error,
      usernames: null
    }
  })),

  on(StoreActions.login, (state: State, _) => ({
    ...state,
    userState: {
      ...initialState.userState,
      loading: true,
      success: false,
      error: null,
    }
  })),

  on(StoreActions.loginSuccess, (state: State, action) => ({
    ...state,
    userState: {
      loading: false,
      success: true,
      error: null,
      user:{
        isAuthenticated: true,
        _id: action.response.user._id,
        username: action.response.user.username,
        gender: action.response.user.gender,
        age: action.response.user.age,
        height: action.response.user.height,
        weight: action.response.user.weight,
        activity: action.response.user.activity,
        calories: action.response.user.calories
      }
    }
  })),

  on(StoreActions.loginFailure, (state: State, action) => ({
    ...state,
    userState: {
      ...initialState.userState,
      loading: false,
      success: false,
      error: action.error,
    }
  })),

  on(StoreActions.logout, (state: State, _) => ({
    ...state,
    userState: {
      ...initialState.userState,
    }
  })),

  on(StoreActions.getCurrentUser, (state: State, _) => ({
    ...state,
    userState: {
      ...initialState.userState,
      loading: true,
      success: false,
      error: null,
    }
  })),

  on(StoreActions.getCurrentUserSuccess, (state: State, action) => ({
    ...state,
    userState: {
      loading: false,
      success: true,
      error: null,
      user:{
        isAuthenticated: true,
        _id: action.response._id,
        username: action.response.username,
        gender: action.response.gender,
        age: action.response.age,
        height: action.response.height,
        weight: action.response.weight,
        activity: action.response.activity,
        calories: action.response.calories
      }
    }
  })),

  on(StoreActions.getCurrentUserFailure, (state: State, action) => ({
    ...state,
    userState: {
      ...initialState.userState,
      loading: false,
      success: false,
      error: action.error,
    }
  })),

  on(StoreActions.getProducts, (state: State, _) => ({
    ...state,
    productsState: {
      ...initialState.productState,
      loading: true,
      success: false,
      error: null,
    }
  })),

  on(StoreActions.getProductsSuccess, (state: State, action) => ({
    ...state,
    productState: {
      loading: false,
      success: true,
      error: null,
      products: action.response
    }
  })),

  on(StoreActions.getProductsFailure, (state: State, action) => ({
    ...state,
    productsState: {
      ...initialState.productState,
      loading: false,
      success: false,
      error: action.error,
    }
  })),
)
