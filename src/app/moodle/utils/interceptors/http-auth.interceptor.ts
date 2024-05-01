import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, finalize, switchAll, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/moodle/services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
    isRefreshing: boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('interceptor')
        const token = this.authService.getToken();
        if (!this.isRefreshing) {
            if (token){
                let decodeToken = jwtDecode(token);
                const isExpired = decodeToken && decodeToken.exp ? decodeToken.exp < Date.now() / 1000: false;
                if (!isExpired){
                    // If we have a token, we set it to the header
                    console.log(decodeToken.exp)
                    console.log(Date.now()/1000)
                    console.log('token no expired')
                    request = request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${this.authService.getToken()}`,
                        },
                    });
                } else{
                    console.log('token expired')
                    sessionStorage.removeItem('token');
                    this.router.navigate(['/login']);
                }
            }
        } else {
            console.log('refresh')
            // If we have a token refresh, we set it to the header
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.authService.getTokenRefresh()}`,
                    DoTokenRefresh: 'ok',
                },
            });
        }

        return next.handle(request)
    }

}
