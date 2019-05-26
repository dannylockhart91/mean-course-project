import {ActionReducerMap, createFeatureSelector, createSelector} from "@ngrx/store";

import {PostsState} from "../posts/store/posts.reducer";
import {AuthState} from "../auth/store/auth.reducer";
import * as fromPosts from '../posts/store/posts.reducer';
import * as fromAuth from '../auth/store/auth.reducer';

export interface AppState {
    posts: PostsState
    auth: AuthState
}

export const reducers: ActionReducerMap<AppState> = {
    posts: fromPosts.PostsReducer,
    auth: fromAuth.AuthReducer
};

// Create feature state selectors to create state selectors
export const getPostsState = createFeatureSelector<PostsState>('posts');
export const getAuthState = createFeatureSelector<AuthState>('auth');

// Auth state selectors
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);
export const getAuthToken = createSelector(getAuthState, fromAuth.getAuthToken);
export const getUserId = createSelector(getAuthState, fromAuth.getUserId);

// Post state selectors
export const getPosts = createSelector(getPostsState, fromPosts.getPosts);
export const getCurrentEditingPost = createSelector(getPostsState, fromPosts.getCurrentEditingPost);
export const getPostPerPage = createSelector(getPostsState, fromPosts.getPostsPerPage);
export const getCurrentPage = createSelector(getPostsState, fromPosts.getCurrentPage);
export const getTotalPosts = createSelector(getPostsState, fromPosts.getTotalPosts);
export const getIsLoading = createSelector(getPostsState, fromPosts.getIsLoading);

