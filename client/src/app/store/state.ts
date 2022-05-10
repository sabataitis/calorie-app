import {DefaultState} from "../shared/interfaces/default-state.interface";
import {ProductDTO} from "../shared/dto/product.dto";
import {UserProductDTO} from "../shared/dto/user-product.dto";
import {AuthUserDTO} from "../shared/dto/user.dto";

export interface UsernamesState extends DefaultState{
  usernames: String[]
}

export interface UserState extends DefaultState{
  user: AuthUserDTO;
  products: UserProductDTO[];
}

export interface ProductState extends DefaultState{
  products: ProductDTO[]
}

export interface CategoryGraphState extends DefaultState{
  data: any
}

export interface LinearGraphState extends DefaultState{
  data: any
}

export interface State {
  usernamesState: UsernamesState;
  userState: UserState;
  productState: ProductState,
  categoryGraphState: CategoryGraphState,
  linearGraphState: LinearGraphState
}
