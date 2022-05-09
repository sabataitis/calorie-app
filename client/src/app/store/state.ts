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

export interface GraphsState extends DefaultState{
  graphs: any
}

export interface State {
  usernamesState: UsernamesState;
  userState: UserState;
  productState: ProductState,
  graphsState: GraphsState
}
