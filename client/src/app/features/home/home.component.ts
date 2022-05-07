import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ProductState, UserState} from "../../store/state";
import {AuthUserDTO} from "../../shared/dto/user.dto";
import {Store} from "@ngrx/store";
import {StoreActions, StoreSelectors} from "../../store";
import {ProductDTO} from "../../shared/dto/product.dto";
import {SelectedProductDTO} from "../../shared/dto/selected-product.dto";

@Component({
  selector: 'calorie-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userState$: Observable<UserState>;
  productState$: Observable<ProductState>;
  isAuthenticated = false;
  user: AuthUserDTO = null;
  products: ProductDTO[] = [];
  term: string = "";
  selectedProduct: ProductDTO;
  selectedProducts: ProductDTO[];

  constructor(private store: Store) {
    this.userState$ = this.store.select(StoreSelectors.selectUserState);
    this.productState$ = this.store.select(StoreSelectors.selectProductState);
  }

  ngOnInit(): void {
    this.store.dispatch(StoreActions.getProducts());
    this.subscribeToUserState();
    this.subscribeToProductState();
  }

  onProductChanged(term: string) {
    this.selectedProduct = this.getSelectedProductByName(term);
    this.selectedProducts.push(this.selectedProduct);
    if (this.selectedProduct) {
      this.term = "";
    }
  }

  enterProducts(products: SelectedProductDTO[]) {
    const payload = {
      userId: this.user._id,
      products
    }
    this.store.dispatch(StoreActions.enterProducts({payload}));
  }

  getSelectedProductByName(selectedName: string): ProductDTO {
    return this.products.find(product => product.name === selectedName);
  }

  private subscribeToUserState(): void {
    this.userState$.subscribe((userState: UserState) => {
      if (userState.success) {
        this.isAuthenticated = userState.user.isAuthenticated;
        this.user = userState.user;
      }
    })
  }

  private subscribeToProductState(): void {
    this.productState$.subscribe((productState: ProductState) => {
      if (productState.success) {
        this.products = productState.products;
      }
    })
  }
}
