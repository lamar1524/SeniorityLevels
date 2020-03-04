import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/services/authentication.service';

@Injectable({
    providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(public authService: AuthenticationService, public router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isLoggedIn()) {
      request = this.addToken(request, this.authService.getToken());
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      }),
    );
  }

  addToken = (request, token) => {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return request;
  };
  handle401Error = (request: HttpRequest<any>, next: HttpHandler) => {
    this.authService.logout();
    this.router.navigate(['']);
    return next.handle(request);
  };
  handleError(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request);
  }
}
