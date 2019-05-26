import {Action} from '@ngrx/store';
import {Post} from "../post.model";

export enum PostsActionTypes {
    AddPostRequest = '[Posts] Add Post Request',
    AddPostSuccess = '[Posts] Add Post Success',
    AddPostFailed = '[Posts] Add Post Failed',
    DeletePostRequest = '[Posts] Delete Post Request',
    DeletePostSuccess = '[Posts] Delete Post Success',
    DeletePostFailed = '[Posts] Delete Post Failed',
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

export class DeletePostRequest implements Action {
    readonly type = PostsActionTypes.DeletePostRequest;

    constructor(public payload: string) {
    }
}
export class DeletePostSuccess implements Action {
    readonly type = PostsActionTypes.DeletePostSuccess;

    constructor(public payload: string){
    }
}

export class DeletePostFailed implements Action {
    readonly type = PostsActionTypes.DeletePostFailed;
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

    constructor(public payload: {posts: Post[], maxPosts: number}) {
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
    DeletePostRequest |
    DeletePostSuccess |
    DeletePostFailed |
    SetEditingPost |
    UpdatePostRequest |
    UpdatePostSuccess |
    UpdatePostFailed |
    FetchPosts |
    SetPosts |
    SetIsLoading;
