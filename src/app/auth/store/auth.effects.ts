import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";

import {Actions, Effect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap, withLatestFrom} from "rxjs/operators";


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
import {select, Store} from "@ngrx/store";

import * as fromApp from '../../store/app.reducers';

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
            return this.http.post<HttpResponse<{ message: string, data }> | HttpErrorResponse>('http://localhost:3000/api/auth/signup', authData).pipe(
                catchError((error) => {
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
            return this.http.post<{ message: string, token?: string, expiresIn?: number }>('http://localhost:3000/api/auth/login', authData).pipe(
                catchError((error) => {
                    return of({message: error.message, error: error})
                })
            )
        }),
        map((response: { message: string, token?: string, expiresIn?: number, error?: any }) => {
            if (response.error) {
                return new SignInFailure();
            } else {
                this.router.navigateByUrl('/').then();
                return new SignInSuccess({token: response.token, expiresIn: response.expiresIn});
            }
        })
    );

    constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>, private router: Router) {
    }
}
