import {Action} from "@ngrx/store";

export enum AuthActionTypes {
    SignInRequest = '[Auth] Sign In Request',
    SignInSuccess = '[Auth] Sign In Success',
    SignInFailure = '[Auth] Sign In Failure',
    SignUpRequest = '[Auth] Sign Up Request',
    SignUpSuccess = '[Auth] Sign Up Success',
    SignUpFailure = '[Auth] Sign Up Failure',
    Logout = '[Auth] Logout'
}

export class SignInRequest implements Action {
    readonly type = AuthActionTypes.SignInRequest;

    constructor(public payload: { email: string, password: string }) {
    }
}

export class SignInSuccess implements Action {
    readonly type = AuthActionTypes.SignInSuccess;

    constructor(public payload: string) {
    }
}

export class SignInFailure implements Action {
    readonly type = AuthActionTypes.SignInFailure;
}

export class SignUpRequest implements Action {
    readonly type = AuthActionTypes.SignUpRequest;

    constructor(public payload: { email: string, password: string }) {
    }
}

export class SignUpSuccess implements Action {
    readonly type = AuthActionTypes.SignUpSuccess;
}

export class SignUpFailure implements Action {
    readonly type = AuthActionTypes.SignUpFailure;
}

export class Logout implements Action {
    readonly type = AuthActionTypes.Logout;
}

export type AuthActions =
    SignInRequest |
    SignInSuccess |
    SignInFailure |
    SignUpRequest |
    SignUpSuccess |
    SignUpFailure |
    Logout;
