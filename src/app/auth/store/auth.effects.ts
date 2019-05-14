import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";

import {Actions, Effect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {catchError, map, switchMap} from "rxjs/operators";

import * as fromAuth from '../../auth/store/auth.reducer'
import {AuthActionTypes, SignUpFailure, SignUpRequest, SignUpSuccess} from "./auth.actions";
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
            return this.http.post<HttpResponse<{ message: string, data: string }> | HttpErrorResponse>('http://localhost:3000/api/auth/signup', authData).pipe(
                catchError((error: HttpErrorResponse) => {
                    return of({message: error.error.message, data: error})
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

    constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromAuth.AuthState>) {
    }
}
