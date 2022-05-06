import {Component, OnInit} from '@angular/core';
import {AuthService} from "./shared/services/auth.service";
import {Store} from "@ngrx/store";
import {StoreActions} from "./store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService, private store: Store) {
  }
  ngOnInit() {
    if(this.authService.isLoggedIn()){
      this.store.dispatch(StoreActions.getCurrentUser());
    }
  }

  title = 'client';
}
