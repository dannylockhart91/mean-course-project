import * as fromPosts from '../posts/store/posts.reducer'
import {ActionReducerMap, createFeatureSelector, createSelector} from "@ngrx/store";
import {PostsState} from "../posts/store/posts.reducer";

export interface AppState {
    posts: fromPosts.PostsState
}

export const reducers: ActionReducerMap<AppState> = {
    posts: fromPosts.PostsReducer
};

// Create feature state selectors to create state selectors
export const getPostsState = createFeatureSelector<PostsState>('posts');

export const getPosts = createSelector(getPostsState, (state: PostsState) => state.posts);
export const getCurrentEditingPost = createSelector(getPostsState, (state: PostsState) => state.currentEditingPost);
export const getIsLoading = createSelector(getPostsState, (state: PostsState) => state.isLoading);

