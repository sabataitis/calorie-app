import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, Observable, throwError} from "rxjs";
import {AuthService} from "../services/auth.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse)=>{
        if (err instanceof HttpErrorResponse && err.status === 401) {
          this.authService.removeSession();
          this.router.navigateByUrl('/login');
        }
        return throwError(err);
      })
    )
  }
}
