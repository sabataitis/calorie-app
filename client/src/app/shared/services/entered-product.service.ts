import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class EnteredProductService{
  constructor(private apiService: ApiService) {}
  URL = 'entered-product';

  create(payload: any): Observable<any>{
    return this.apiService.post(this.URL, payload);
  }

  update(payload: any): Observable<any>{
    return this.apiService.patch(this.URL + `/${payload._id}`, payload);
  }
}
