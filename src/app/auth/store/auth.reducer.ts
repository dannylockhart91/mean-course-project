import {AuthActions, AuthActionTypes} from "./auth.actions";

export interface AuthState {
    isLoading: boolean;
    isAuthenticated: boolean;
}

export const initialState: AuthState = {
    isLoading: false,
    isAuthenticated: false
};

export function AuthReducer(state: AuthState = initialState, action: AuthActions): AuthState {
    switch (action.type) {
        case AuthActionTypes.SignUpRequest:
            return {
                ...state,
                isLoading: true
            };
        case AuthActionTypes.SignUpSuccess:
            return {
                ...state,
                isLoading: false
            };
        default:
            return {
                ...state
            }
    }
}
