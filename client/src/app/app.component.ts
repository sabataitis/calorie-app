import {Component, OnInit} from '@angular/core';
import {AuthService} from "./shared/services/auth.service";
import {Store} from "@ngrx/store";
import {StoreActions} from "./store";
import {Meta} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private meta: Meta, private authService: AuthService, private store: Store) {}
  keywords = 'kalorijos, kalorijų skaičiuoklė, mityba, sveika gyvensena, calorie counter, calorie app';
  description: string = 'Kalorijų skaičiuoklė'

  ngOnInit() {
    this.meta.addTag({name: 'description', content: this.description});
    this.meta.addTag({name: 'keywords', content: this.keywords});

    if(this.authService.isLoggedIn()){
      this.store.dispatch(StoreActions.getCurrentUser());
    }
  }

  title = 'client';
}
