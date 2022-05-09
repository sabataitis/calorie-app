import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {UserDTO} from "../dto/user.dto";

@Injectable({providedIn: 'root'})
export class UserService{
  constructor(private apiService: ApiService) {}
  USER_URL = 'user';

  products(payload: any): Observable<any>{
    return this.apiService.get(this.USER_URL + `/products?date=${payload.date}`);
  }

  graphs(payload: any): Observable<any>{
    return this.apiService.get(this.USER_URL + `/graphs?date=${payload.date}`);
  }

  register(payload: any): Observable<Partial<UserDTO>>{
    return this.apiService.post(this.USER_URL, payload);
  }
  getUsernames(): Observable<String[]>{
    return this.apiService.get(this.USER_URL + '/usernames');
  }
}
