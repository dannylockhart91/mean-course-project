import {AuthActions, AuthActionTypes} from "./auth.actions";

export interface AuthState {
    isLoading: boolean;
    isAuthenticated: boolean;
    token: string;
    tokenExpiration: Date;
    userId: string;
}

export const initialState: AuthState = {
    isLoading: false,
    isAuthenticated: false,
    token: null,
    tokenExpiration: null,
    userId: null
};

export function AuthReducer(state: AuthState = initialState, action: AuthActions): AuthState {
    switch (action.type) {
        case AuthActionTypes.SignInRequest: {
            return {
                ...state,
                isLoading: true
            }
        }
        case AuthActionTypes.SignInSuccess: {
            const date = new Date();
            const tokenExpireDate = new Date(date.getTime() + action.payload.expiresIn * 1000);
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                token: action.payload.token,
                tokenExpiration: tokenExpireDate,
                userId: action.payload.userId
            }
        }
        case AuthActionTypes.SignInFailure: {
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false
            }
        }
        case AuthActionTypes.SignUpRequest:
            return {
                ...state,
                isLoading: true
            };
        case AuthActionTypes.SignUpSuccess:
            return {
                ...state,
                isLoading: false,
            };
        case AuthActionTypes.SignUpFailure:
            return {
                ...state,
                isLoading: false,
            };
        case AuthActionTypes.SetIsAuthenticated:
            return {
                ...state,
                isAuthenticated: action.payload.isAuth,
                token: action.payload.token
            };
        case AuthActionTypes.Logout:
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                tokenExpiration: null,
                userId: null
            };
        default:
            return {
                ...state
            }
    }
}

export const getIsAuth = (state: AuthState) => state.isAuthenticated;
export const getAuthToken = (state: AuthState) => state.token;
export const getIsLoading = (state: AuthState) => state.isLoading;
export const getUserId = (state: AuthState) => state.userId;
