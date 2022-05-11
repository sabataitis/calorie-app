import {
  createReducer,
  on
} from '@ngrx/store';
import {DefaultStateValues} from "../shared/constants/default-state-values.const";
import {State} from "./state";

import {StoreActions} from './index';
import {UserProductDTO} from "../shared/dto/user-product.dto";
import {AuthUserDTO} from "../shared/dto/user.dto";

const userDefaultValues: AuthUserDTO = {
  isAuthenticated: false,
  _id: null,
  username: null,
  gender: null,
  age: null,
  height: null,
  weight: null,
  activity: null,
  goal: null,
  goalNum: null,
  calories: null,
  recommendations:null,
  formula: null
}

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
      goal: null,
      goalNum: null,
      calories: null,
      recommendations:null,
      formula: null
    },
    products: []
  },
  productState: {...DefaultStateValues, products: []},
  polarChartState: {...DefaultStateValues, data: []},
  barChartState: {...DefaultStateValues, data: []},
};

export const StoreReducer = createReducer<State>(
  initialState,

  on(StoreActions.updateProfileSuccess, (state: State, action) => ({
    ...state,
    userState: {
      loading: false,
      success: true,
      error: null,
      user: {...action.response, isAuthenticated: true},
      products: []
    }
  })),

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
      user: {...action.response.user, isAuthenticated: true},
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
      products: action.response.products
    }
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

  on(StoreActions.getUserPolarChart, (state: State, _) => ({
    ...state,
    polarChartState: {
      ...initialState.polarChartState,
      loading: true,
    }
  })),

  on(StoreActions.getUserPolarChartSuccess, (state: State, action) => ({
    ...state,
    polarChartState: {
      loading: false,
      success: true,
      error: null,
      data: action.response
    }
  })),

  on(StoreActions.getUserPolarChartFailure, (state: State, action) => ({
    ...state,
    polarChartState: {
      ...initialState.polarChartState,
      error: action.error,
    }
  })),
  on(StoreActions.getUserBarChart, (state: State, _) => ({
    ...state,
    barChartState: {
      ...initialState.barChartState,
      loading: true,
    }
  })),
  on(StoreActions.getUserBarChartSuccess, (state: State, action) => ({
    ...state,
    barChartState: {
      loading: false,
      success: true,
      error: null,
      data: action.response
    }
  })),

  on(StoreActions.getUSerBarChartFailure, (state: State, action) => ({
    ...state,
    barChartState: {
      ...initialState.barChartState,
      error: action.error,
    }
  })),
)
