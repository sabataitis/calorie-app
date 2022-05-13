import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Observable} from "rxjs";

@Injectable()
export class LoginGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/paieska']);
      return false;
    }
    return true;
  }
}
