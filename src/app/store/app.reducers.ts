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

export const getPosts = createSelector(getPostsState, (state: PostsState) => state.posts);
export const getCurrentEditingPost = createSelector(getPostsState, (state: PostsState) => state.currentEditingPost);
export const getPostPerPage = createSelector(getPostsState, (state: PostsState) => state.postsPerPage);
export const getCurrentPage = createSelector(getPostsState, (state: PostsState) => state.currentPage);
export const getTotalPosts = createSelector(getPostsState, (state: PostsState) => state.totalPostCount);
export const getIsLoading = createSelector(getPostsState, (state: PostsState) => state.isLoading);

