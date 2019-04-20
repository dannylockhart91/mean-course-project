import { Action } from '@ngrx/store';
import {Post} from "../post.model";

export enum PostsActionTypes {
    AddPost = '[Posts] Add Post',
    DeletePost = '[Posts] Delete Post'
}

export class AddPost implements Action {
    readonly type = PostsActionTypes.AddPost;

    constructor(public payload: Post){
    }
}

export class DeletePost implements Action {
    readonly type = PostsActionTypes.DeletePost
}

export type PostActions = AddPost | DeletePost;
