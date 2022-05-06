import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly API_BASE_URL = environment.API;

  constructor(private http: HttpClient) { }

  get(path: string, params: HttpParams = new HttpParams(), options?: any): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}${path}`, { params, ...options });
  }

  patch(path: string, body: any = {}, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.patch(`${this.API_BASE_URL}${path}`, body, { params });
  }

  put(path: string, body: any = {}, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.put(`${this.API_BASE_URL}${path}`, body, { params });
  }

  post(path: string, body: any = {}, options?: any): Observable<any> {
    return this.http.post(`${this.API_BASE_URL}${path}`, body, { ...options });
  }

  delete(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.delete(`${this.API_BASE_URL}${path}`, { params });
  }

  request<T>(method: string, url: string, options?: any, body: any = {}): Observable<HttpEvent<T>> {
    const req = new HttpRequest(method, `${this.API_BASE_URL}${url}`, body, options);
    return this.http.request(req);
  }

}
