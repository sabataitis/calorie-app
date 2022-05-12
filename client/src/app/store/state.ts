import {DefaultState} from "../shared/interfaces/default-state.interface";
import {ProductDTO} from "../shared/dto/product.dto";
import {UserProductDTO} from "../shared/dto/user-product.dto";
import {AuthUserDTO, UserStatisticsDTO} from "../shared/dto/user.dto";

export interface UsernamesState extends DefaultState{
  usernames: String[]
}

export interface UserState extends DefaultState{
  current: AuthUserDTO ;
  previous: UserStatisticsDTO;
  products: UserProductDTO[];
}

export interface ProductState extends DefaultState{
  products: ProductDTO[]
}

export interface PolarChartState extends DefaultState{
  data: any
}

export interface BarChartState extends DefaultState{
  data: any
}

export interface State {
  usernamesState: UsernamesState;
  userState: UserState;
  productState: ProductState,
  polarChartState: PolarChartState,
  barChartState: BarChartState
}
