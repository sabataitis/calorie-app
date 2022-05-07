import {DefaultState} from "../shared/interfaces/default-state.interface";
import {ProductDTO} from "../shared/dto/product.dto";
import {UserProductDTO} from "../shared/dto/user-product.dto";

export interface UsernamesState extends DefaultState{
  usernames: String[]
}

export interface UserState extends DefaultState{
  user:{
    isAuthenticated: boolean,
    _id: string,
    username: string,
    gender: string,
    age: number,
    height: number,
    weight: number,
    activity: string,
    calories: number
  }
  products: UserProductDTO[];
}

export interface ProductState extends DefaultState{
  products: ProductDTO[]
}

export interface State {
  usernamesState: UsernamesState;
  userState: UserState;
  productState: ProductState
}
