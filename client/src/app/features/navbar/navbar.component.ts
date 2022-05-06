import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {UserState} from "../../store/state";
import {StoreActions, StoreSelectors} from "../../store";
import {Observable} from "rxjs";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {AuthUserDTO} from "../../shared/dto/user.dto";

@Component({
  selector: 'calorie-app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userState$: Observable<UserState>;
  isAuthenticated = false;
  user: AuthUserDTO = null;

  constructor(private store: Store, private authService: AuthService, private router: Router) {
    this.userState$ = this.store.select(StoreSelectors.selectUserState);
  }

  ngOnInit(): void {
    this.subscribeToUserState();
  }

  logout(): void{
    this.store.dispatch(StoreActions.logout());
    this.authService.removeSession();
    window.location.reload();
  }

 private subscribeToUserState(): void{
    this.userState$.subscribe((userState: UserState)=>{
      if(userState.success){
        this.isAuthenticated = userState.user.isAuthenticated;
        this.user = userState.user;
      }
    })
 }

}
