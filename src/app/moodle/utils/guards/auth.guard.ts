import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivate,
    UrlTree,
    Router,
} from '@angular/router';
import { Observable, iif, of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { AuthService } from 'src/app/moodle/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        // evaluate correct authentication
        const token = this.authService.getToken()
        if (token) {
            return true
        }else{
            this.router.navigate(['/login'])
            return false
        }
    }
}
