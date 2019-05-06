import {Action} from '@ngrx/store';
import {Post} from "../post.model";

export enum PostsActionTypes {
    AddPostRequest = '[Posts] Add Post Request',
    AddPostSuccess = '[Posts] Add Post Success',
    AddPostFailed = '[Posts] Add Post Failed',
    DeletePost = '[Posts] Delete Post',
    SetEditingPost = '[Posts] Set Editing Post',
    UpdatePostRequest = '[Posts] Update Post Request',
    UpdatePostSuccess = '[Posts] Update Post Success',
    UpdatePostFailed = '[Posts] Update Post Failed',
    FetchPosts = '[Posts] Fetch Posts',
    SetPosts = '[Posts] Set Posts',
    SetIsLoading = '[Posts] Set isLoading',
}

export class AddPostRequest implements Action {
    readonly type = PostsActionTypes.AddPostRequest;

    constructor(public payload: { post: Post, image?: File }) {
    }
}

export class AddPostSuccess implements Action {
    readonly type = PostsActionTypes.AddPostSuccess;

    constructor(public payload: Post) {
    }
}

export class AddPostFailed implements Action {
    readonly type = PostsActionTypes.AddPostFailed;
}

export class DeletePost implements Action {
    readonly type = PostsActionTypes.DeletePost;

    constructor(public payload: string) {
    }
}

export class SetEditingPost implements Action {
    readonly type = PostsActionTypes.SetEditingPost;

    constructor(public payload: Post) {
    }
}

export class UpdatePostRequest implements Action {
    readonly type = PostsActionTypes.UpdatePostRequest;

    constructor(public payload: { post: Post, image: File | string }) {
    }
}

export class UpdatePostSuccess implements Action {
    readonly type = PostsActionTypes.UpdatePostSuccess;

    constructor(public payload: Post) {
    }
}

export class UpdatePostFailed implements Action {
    readonly type = PostsActionTypes.UpdatePostFailed;
}

export class FetchPosts implements Action {
    readonly type = PostsActionTypes.FetchPosts;

    constructor(public payload: { pageSize: number, currentPage: number }) {
    }
}

export class SetPosts implements Action {
    readonly type = PostsActionTypes.SetPosts;

    constructor(public payload: Post[]) {
    }
}

export class SetIsLoading implements Action {
    readonly type = PostsActionTypes.SetIsLoading;

    constructor(public payload: boolean) {
    }
}

export type PostActions =
    AddPostRequest |
    AddPostSuccess |
    DeletePost |
    SetEditingPost |
    UpdatePostRequest |
    UpdatePostSuccess |
    UpdatePostFailed |
    FetchPosts |
    SetPosts |
    SetIsLoading;
