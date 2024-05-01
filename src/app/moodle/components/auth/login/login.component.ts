import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/moodle/services/auth.service';
import { Login } from 'src/app/moodle/apis/login';
import { CookieService } from 'ngx-cookie-service';
//import { SharedInfoService } from 'src/app/services/shared-info.service';
import { CommonsUtils } from 'src/app/moodle/utils/commons.utils';
import { environment } from 'src/environments/environment';
import { v4 as uuid } from 'uuid';
import { Token } from 'src/app/moodle/apis/token';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
    isUserRemember: boolean = false;
    isSubmitted: boolean = false;
    isPasswordTextView: boolean = false; // See password like type password (false) or text (true)
    remembermeCookieName: string = 'rememberme';
    errorMessage: string = '';
    login: Login = {}
    token: Token = {}

    loginForm: FormGroup = this.formBuilder.group({
        username: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        rememberme: new FormControl(false),
    });

    constructor(
        //private authenticationService: AuthenticationService,
        //public sharedInfoService: SharedInfoService,
        private cookieService: CookieService,
        private commonsUtils: CommonsUtils,
        public authService: AuthService,
        private formBuilder: FormBuilder,
        private router: Router
    ) {}

    ngOnInit(): void {
        const usernameFromCookie = this.cookieService.get(
            this.remembermeCookieName
        );
        if (this.commonsUtils.isNotBlank(usernameFromCookie)) {
            this.loginForm.get('username')?.setValue(usernameFromCookie);
            this.loginForm.get('rememberme')?.setValue(true);
        }
        if (this.authService.getToken() != '') {
            this.router.navigate(['/']);
        }
    }

    get f(): { [key: string]: AbstractControl } {
        return this.loginForm.controls;
    }

    submit(): void {
        this.errorMessage = '';
        this.login.username = this.loginForm.get('username')!.value;
        this.login.password = this.loginForm.get('password')!.value;

        if (this.loginForm.valid) {
            this.isSubmitted = true;
            this.loginForm.controls['username'].disable();
            this.loginForm.controls['password'].disable();

            this.authService
                .login(this.login.username, this.login.password)
                .subscribe(
                    (data: Token) => {
                        console.log(data);
                        this.authService.setToken(data.token);
                        //this.authService.setToken(data.refresh_token);
                        console.log('set token')
                        this.cookieService.delete(this.remembermeCookieName);
                        if (this.loginForm.get('rememberme')?.value) {
                            this.setRememberMeCookie(
                                this.loginForm.get('username')!.value
                            );
                        }

                        //const token = this.authService.getToken();
                        //this.sharedInfoService.setUserProfileInfo(token);
                        this.router.navigate(['/']);
                    },
                    (error: HttpErrorResponse) => {

                        this.isSubmitted = false;
                        this.loginForm.controls['username'].enable();
                        this.loginForm.controls['password'].enable();
                        this.errorMessage = 'Username or Password invalid';

                        //if (err.error.error.codigo == "NA" && err.error.error.mensaje.indexOf("Usuario Expirado") != -1) {
                        //const feUuidResetPassword = uuid();
                        //sessionStorage.setItem("feUuidResetPassword", feUuidResetPassword);
                        //this.router.navigate(['/auth/password-reset', { uuidrp: feUuidResetPassword, uemail: this.loginForm.get("username")!.value }]);
                        //}
                    });
        }
    }

    setRememberMeCookie(usermane: string) {
        let d: Date = new Date();
        d.setTime(
            d.getTime() +
                environment.REMEMBER_ME_EXPIRATION_DAY_DEFAULT *
                    24 *
                    60 *
                    60 *
                    10000
        );
        this.cookieService.set(this.remembermeCookieName, usermane, d);
    }

    viewPasswordText(): void {
        this.isPasswordTextView = !this.isPasswordTextView;
    }
}
