import {PostActions, PostsActionTypes} from "./posts.actions";
import {Post} from "../post.model";

export interface PostsState {
    posts: Post[],
    currentEditingPost: Post,
}

export const initialState: PostsState = {
    posts: [],
    currentEditingPost: null
};

export function PostsReducer(state: PostsState = initialState, action: PostActions): PostsState {
    switch (action.type) {
        case PostsActionTypes.AddPostSuccess: {
            return {
                ...state,
                posts: [...state.posts, action.payload]
            }
        }
        case PostsActionTypes.UpdatePostSuccess: {
            let oldPost;
            state.posts.forEach((post) => {
                if(post.id === action.payload.id) {
                    oldPost = post;
                }
            });
            if(oldPost) {
             let index = state.posts.indexOf(oldPost);
             let newPosts = [...state.posts];
             newPosts.splice(index, 1, action.payload);
             return {
                 ...state,
                 posts: newPosts
             }
            } else {
                return {
                    ...state
                }
            }
        }
        case PostsActionTypes.DeletePost: {
            let posts = state.posts;
            let newPosts = posts.filter((post) => {
                return post.id != action.payload
            });
            return {
                ...state,
                posts: newPosts
            }
        }
        case PostsActionTypes.SetEditingPost: {
            return {
                ...state,
                currentEditingPost: action.payload
            }
        }
        case PostsActionTypes.SetPosts: {
            if (typeof action.payload !== 'undefined' && action.payload.length > 0) {
                return {
                    ...state,
                    posts: action.payload
                }
            } else {
                return {
                    ...state
                }
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}
