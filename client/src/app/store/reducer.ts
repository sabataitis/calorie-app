import {
  createReducer,
  on
} from '@ngrx/store';
import {DefaultStateValues} from "../shared/constants/default-state-values.const";
import {State} from "./state";

import {StoreActions} from './index';
import {UserProductDTO} from "../shared/dto/user-product.dto";

export const initialState: State = {
  usernamesState: {...DefaultStateValues, usernames: null},
  userState: {
    ...DefaultStateValues,
    user: {
      isAuthenticated: false,
      _id: null,
      username: null,
      gender: null,
      age: null,
      height: null,
      weight: null,
      activity: null,
      calories: null,
      recommendations:null
    },
    products: []
  },
  productState: {...DefaultStateValues, products: []},
  graphsState: {...DefaultStateValues, graphs: []}
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
      user: {
        ...action.response,
        isAuthenticated: true,
      },
      // user: {
      //   isAuthenticated: true,
      //   _id: action.response.user._id,
      //   username: action.response.user.username,
      //   gender: action.response.user.gender,
      //   age: action.response.user.age,
      //   height: action.response.user.height,
      //   weight: action.response.user.weight,
      //   activity: action.response.user.activity,
      //   calories: action.response.user.calories
      // },
      products: []
    }
  })),

  on(StoreActions.loginFailure, (state: State, action) => ({
    ...state,
    userState: {
      ...initialState.userState,
      loading: false,
      success: false,
      error: action.error,
    },
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
      user: {
        ...action.response,
        isAuthenticated: true,
      },
      products: []
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

  on(StoreActions.getUserProducts, (state: State, _) => ({
    ...state,
    userState: {
      ...state.userState,
      products: []
    }
  })),

  on(StoreActions.getUserProductsSuccess, (state: State, action) => ({
    ...state,
    userState: {
      ...state.userState,
      products: action.response}
  })),

  on(StoreActions.getUserProductsFailure, (state: State, action) => ({
    ...state,
    userState: {
      ...state.userState,
      products: []
    }
  })),

  on(StoreActions.updateEnteredProduct, (state: State, action) => ({
    ...state,
    userState: {
      ...state.userState,
      products: action.payload.products
    }
  })),

  on(StoreActions.updateEnteredProductSuccess, (state: State, action) => ({
    ...state,
    userState: {
      ...state.userState,
      products: [...state.userState.products].map((product: UserProductDTO)=> {
        if(product._id === action.response._id){
          return {...product, nutrients: action.response.nutrients, quantity: action.response.quantity}
        }
        return product;
      })
    }
  })),

  on(StoreActions.updateEnteredProductFailure, (state: State, action) => ({
    ...state,
    userState: {
      ...state.userState,
    }
  })),

  on(StoreActions.getUserGraphs, (state: State, _) => ({
    ...state,
    graphsState: {
      ...state.graphsState,
      loading: true,
    }
  })),

  on(StoreActions.getUserGraphsSuccess, (state: State, action) => ({
    ...state,
    graphsState: {
      loading: false,
      success: true,
      error: null,
      graphs: action.response
    }
  })),

  on(StoreActions.getUserGraphsFailure, (state: State, action) => ({
    ...state,
    usernamesState: {
      loading: false,
      success: false,
      error: action.error,
      usernames: null
    }
  })),
)
