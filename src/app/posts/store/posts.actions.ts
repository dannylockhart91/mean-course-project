import {Action} from '@ngrx/store';
import {Post} from "../post.model";

export enum PostsActionTypes {
    AddPost = '[Posts] Add Post',
    DeletePost = '[Posts] Delete Post',
    FetchPosts = '[Posts] Fetch Posts',
    SetPosts = '[Posts] Set Posts'
}

export class AddPost implements Action {
    readonly type = PostsActionTypes.AddPost;

    constructor(public payload: Post) {
    }
}

export class DeletePost implements Action {
    readonly type = PostsActionTypes.DeletePost;

    constructor(public payload: Post) {
    }
}

export class FetchPosts implements Action {
    readonly type = PostsActionTypes.FetchPosts;
}

export class SetPosts implements Action {
    readonly type = PostsActionTypes.SetPosts;

    constructor(public payload: Post[]){}
}

export type PostActions =
    AddPost |
    DeletePost |
    FetchPosts |
    SetPosts;
