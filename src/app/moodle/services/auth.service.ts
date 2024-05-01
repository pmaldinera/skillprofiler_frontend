import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Login } from '../apis/login';
import { Observable, catchError, throwError } from 'rxjs';
import { ButtonDirective } from 'primeng/button';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiURL = 'http://127.0.0.1:8000/api/v1';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        }),
    };

    isValidToken: boolean = false;

    constructor(private httpClient: HttpClient, public router: Router) {}

    login(username: string, password: string): Observable<any> {
        let body = new URLSearchParams();
        body.set('username', username);
        body.set('password', password);
        return this.httpClient
            .post(this.apiURL + '/token', body.toString(), this.httpOptions)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                })
            );
    }

    validate_token(token: string): Observable<any> {
        return this.httpClient.get(this.apiURL + '/token-validate?token=' + token).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            })
        );
    }

    removeToken(): void {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('tokenRefresh');
    }

    setToken(token: string): void {
        sessionStorage.setItem('token', token);
    }

    getToken(): string {
        return sessionStorage.getItem('token') || '';
    }

    setTokenRefresh(tokenRefresh: string): void {
        sessionStorage.setItem('tokenRefresh', tokenRefresh);
    }

    getTokenRefresh(): string {
        return sessionStorage.getItem('tokenRefresh') || '';
    }

    logout(): void {
        sessionStorage.clear();
        this.router.navigateByUrl('/login');
    }
}
