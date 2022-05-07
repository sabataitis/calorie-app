import { Component, OnInit } from '@angular/core';
import {UserState} from "../../store/state";
import {Store} from "@ngrx/store";
import {StoreActions, StoreSelectors} from "../../store";
import {Observable} from "rxjs";
import {UserProductDTO} from "../../shared/dto/user-product.dto";

@Component({
  selector: 'calorie-app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userState$: Observable<UserState>;
  userProducts: UserProductDTO[];

  constructor(private store: Store) {
    this.userState$ = this.store.select(StoreSelectors.selectUserState);
  }

  ngOnInit(): void {
    this.store.dispatch(StoreActions.getUserProducts());
    this.subscribeToUserState();
  }

  private subscribeToUserState(): void{
    this.userState$.subscribe((userState: UserState)=>{
      if(userState.user.isAuthenticated){
        this.userProducts = userState.products;
      }
    })
  }

}
