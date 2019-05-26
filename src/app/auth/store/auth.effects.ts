import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";

import {environment} from "../../../environments/environment";

import {Actions, Effect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap} from "rxjs/operators";


import {
    AuthActionTypes,
    SignInFailure,
    SignInRequest,
    SignInSuccess,
    SignUpFailure,
    SignUpRequest,
    SignUpSuccess
} from "./auth.actions";
import {AuthData} from "../auth-data.modle";
import {of} from "rxjs";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";

import * as fromApp from '../../store/app.reducers';
import {UiService} from "../../shared/ui.service";

@Injectable()
export class AuthEffects {

    @Effect()
    signUpRequest$ = this.actions$.pipe(
        ofType<SignUpRequest>(AuthActionTypes.SignUpRequest),
        map((action: SignUpRequest) => {
            return action.payload;
        }),
        switchMap((data: AuthData) => {
            const authData: AuthData = {
                email: data.email,
                password: data.password
            };
            return this.http.post<HttpResponse<{ message: string, data }> | HttpErrorResponse>(environment.apiURL + '/auth/signup', authData).pipe(
                catchError((error: HttpErrorResponse) => {
                    this.uiService.showSnackBarError(`Error During Sign-up - ${error.error.message}`, 5000);
                    return of({message: '', data: error})
                })
            )
        }),
        map((result: { message: string, data }) => {
            if (!(result.data instanceof HttpErrorResponse)) {
                console.log(result.message);
                return new SignUpSuccess();
            } else {
                console.log(result.message, result.data);
                return new SignUpFailure();
            }
        })
    );

    @Effect()
    signInRequest$ = this.actions$.pipe(
        ofType<SignInRequest>(AuthActionTypes.SignInRequest),
        map((action: SignInRequest) => {
            return action.payload
        }),
        switchMap((data: AuthData) => {
            const authData: AuthData = {
                email: data.email,
                password: data.password
            };
            return this.http.post<{ message: string, token?: string, userId?: string, expiresIn?: number }>(environment.apiURL + '/auth/login', authData).pipe(
                catchError((error: HttpErrorResponse) => {
                    this.uiService.showSnackBarError(`Error During Sign-up - ${error.error.message}`, 5000);
                    return of({message: error.message, error: error})
                })
            )
        }),
        map((response: { message: string, token?: string, userId?: string, expiresIn?: number, error?: any }) => {
            if (response.error) {
                return new SignInFailure();
            } else {
                this.router.navigateByUrl('/').then();
                localStorage.setItem('token', response.token);
                return new SignInSuccess({
                    token: response.token,
                    userId: response.userId,
                    expiresIn: response.expiresIn
                });
            }
        })
    );

    constructor(private actions$: Actions,
                private http: HttpClient,
                private router: Router,
                private uiService: UiService,
                private store: Store<fromApp.AppState>,) {
    }
}
