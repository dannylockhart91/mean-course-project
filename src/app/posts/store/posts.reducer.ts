import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PostActions, PostsActionTypes} from "./posts.actions";
import {Post} from "../post.model";

export interface PostsState {
    posts: Post[]
}

export const initialState: PostsState = {
    posts: []
};

export function PostsReducer(state: PostsState = initialState, action: PostActions): PostsState {
    switch(action.type) {
        case PostsActionTypes.AddPost: {
            return {
                ...state,
                posts: [...state.posts, action.payload]
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export const getPostsState = createFeatureSelector<PostsState>('posts');
export const getPosts = createSelector(getPostsState, (state: PostsState) => state.posts);