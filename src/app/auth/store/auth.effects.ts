import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";

import {Actions, Effect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap} from "rxjs/operators";

import {AuthActionTypes, SignInRequest, SignUpFailure, SignUpRequest, SignUpSuccess} from "./auth.actions";
import {AuthData} from "../auth-data.modle";
import {of} from "rxjs";

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

    @Effect({dispatch: false})
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
            return this.http.post('http://localhost:3000/api/auth/login', authData).pipe(
                catchError((error) => {
                    return of({message: error.message, data: error})
                })
            )
        }),
        map((data) => {
            console.log(data);
        })
    );

    constructor(private actions$: Actions, private http: HttpClient) {
    }
}
