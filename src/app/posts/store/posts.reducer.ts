import {PostActions, PostsActionTypes} from "./posts.actions";
import {Post} from "../post.model";

export interface PostsState {
    posts: Post[],
    currentEditingPost: Post,
    isLoading: boolean
}

export const initialState: PostsState = {
    posts: [],
    currentEditingPost: null,
    isLoading: false
};

export function PostsReducer(state: PostsState = initialState, action: PostActions): PostsState {
    switch (action.type) {
        case PostsActionTypes.AddPostSuccess: {
            return {
                ...state,
                isLoading: false,
                posts: [...state.posts, action.payload]
            }
        }
        case PostsActionTypes.UpdatePostSuccess: {
            console.log(action.payload);
            let oldPost;
            state.posts.forEach((post) => {
                if (post.id === action.payload.id) {
                    oldPost = post;
                }
            });
            if (oldPost) {
                let index = state.posts.indexOf(oldPost);
                let newPosts = [...state.posts];
                newPosts.splice(index, 1, action.payload);
                return {
                    ...state,
                    isLoading: false,
                    posts: newPosts
                }
            } else {
                return {
                    ...state,
                    isLoading: false
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
                    isLoading: false,
                    posts: action.payload
                }
            } else {
                return {
                    ...state,
                    isLoading: false
                }
            }
        }
        case PostsActionTypes.SetIsLoading: {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}
