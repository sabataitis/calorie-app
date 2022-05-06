import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService{
  constructor(private apiService: ApiService) {}
  AUTH_URL = 'auth';

  login(payload: any): Observable<any>{
    return this.apiService.post(this.AUTH_URL + '/login', payload);
  }
  current(): Observable<any>{
    return this.apiService.post(this.AUTH_URL + '/current');
  }
  getJWTToken(): string{
    return localStorage.getItem('access-token');
  }
  setSession(payload: any): void{
    const {response} = payload;
    localStorage.setItem('access-token', response.access_token);
  }
  removeSession(): void{
    localStorage.clear();
  }
  isLoggedIn(): boolean{
    let token = this.getJWTToken();
    return !!token;
  }

}
