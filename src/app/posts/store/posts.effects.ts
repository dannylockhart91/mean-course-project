import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {Action, Store} from "@ngrx/store";
import {Actions, Effect, ofType, OnInitEffects} from "@ngrx/effects";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {of} from "rxjs";

import {
    AddPostFailed,
    AddPostRequest,
    AddPostSuccess,
    DeletePost,
    FetchPosts,
    PostsActionTypes, SetIsLoading,
    SetPosts, UpdatePostFailed,
    UpdatePostRequest, UpdatePostSuccess
} from "./posts.actions";
import {Post} from "../post.model";
import * as fromApp from "../../store/app.reducers";

@Injectable()
export class PostsEffects implements OnInitEffects {

    @Effect()
    addPostRequest$ = this.actions$.pipe(
        ofType<AddPostRequest>(PostsActionTypes.AddPostRequest),
        map((action: AddPostRequest) => {
            this.store.dispatch(new SetIsLoading(true));
            return action.payload
        }),
        switchMap((data: { post: Post, image: File }) => {
            const postData = new FormData();
            postData.append('title', data.post.title);
            postData.append('content', data.post.content);
            postData.append('timeCreated', data.post.timeCreated.toString());
            postData.append('updated', (data.post.updated | -1).toString());
            postData.append('image', data.image, data.post.title);
            return this.http.post<{ message: string, post: Post }>('http://localhost:3000/api/posts', postData).pipe(
                catchError((err) => {
                    console.log(err);
                    return of({message: '', post: null})
                })
            );
        }),
        map((data: { message: string, post: any }) => {
            if (data.post !== null) {
                const post: Post = {
                    id: data.post._id,
                    title: data.post.title,
                    content: data.post.content,
                    timeCreated: data.post.timeCreated,
                    updated: null,
                    imagePath: data.post.imagePath
                };
                console.log('Post Added');
                return new AddPostSuccess(post);
            } else {
                console.log('Error Adding Post');
                return new AddPostFailed();
            }
        })
    );

    @Effect()
    updatePostRequest$ = this.actions$.pipe(
        ofType<UpdatePostRequest>(PostsActionTypes.UpdatePostRequest),
        map((action: UpdatePostRequest) => {
            this.store.dispatch(new SetIsLoading(true));
            return action.payload
        }),
        switchMap((data: { post: any, image: File | string }) => {
            let postData: Post | FormData | any;
            if (typeof data.image === 'object') {
                postData = new FormData();
                postData.append('_id', data.post.id);
                postData.append('title', data.post.title);
                postData.append('content', data.post.content);
                postData.append('timeCreated', data.post.timeCreated.toString());
                postData.append('updated', (data.post.updated || -1).toString());
                postData.append('image', data.image, data.post.title);
            } else {
                postData = {
                    _id: data.post.id,
                    title: data.post.title,
                    content: data.post.content,
                    timeCreated: data.post.timeCreated,
                    updated: data.post.updated,
                    imagePath: data.image
                };
            }
            return this.http.patch<{ message: string, post: Post }>('http://localhost:3000/api/posts/' + data.post.id, postData).pipe(
                catchError((err) => {
                    console.log(err);
                    return of({message: ''})
                })
            );
        }),
        map((response: { message: string, post: Post }) => {
            if (response.message !== '') {
                console.log('Update Successful');
                return new UpdatePostSuccess(response.post);
            } else {
                console.log('Update Not Successful');
                return new UpdatePostFailed();
            }
        })
    );

    @Effect({dispatch: false})
    deletePost$ = this.actions$.pipe(
        ofType<DeletePost>(PostsActionTypes.DeletePost),
        map((action: DeletePost) => {
            return action.payload
        }),
        switchMap((id: string) => {
            return this.http.delete<{ message: string }>('http://localhost:3000/api/posts/' + id).pipe(
                catchError((err) => {
                    console.log(err);
                    return of({message: ''});
                })
            );
        }),
        tap((data: { message: string }) => {
            if (data.message !== '') {
                console.log('Post Deleted');
            } else {
                console.log('Post Not Deleted');
            }
        })
    );

    @Effect()
    fetchPosts$ = this.actions$.pipe(
        ofType<FetchPosts>(PostsActionTypes.FetchPosts),
        map((action: FetchPosts) => {
            this.store.dispatch(new SetIsLoading(true));
            return action.payload;
        }),
        switchMap((pageInfo: {pageSize: number, currentPage: number}) => {
            const queryParams = `?pageSize=${pageInfo.pageSize}&page=${pageInfo.currentPage}`;
            return this.http.get<{ message: string, posts: any }>('http://localhost:3000/api/posts' + queryParams).pipe(
                catchError((err) => {
                    console.log(err);
                    return of({message: '', posts: null})
                })
            );
        }),
        map((postData: { message: string, posts: any }) => {
            if (postData.posts !== null) {
                return postData.posts.map((post) => {
                    return {
                        id: post._id,
                        title: post.title,
                        content: post.content,
                        timeCreated: post.timeCreated,
                        updated: post.updated != -1 ? post.updated : null,
                        imagePath: post.imagePath
                    }
                })
            } else {
                return []
            }
        }),
        map((mappedPosts: Post[]) => {
            if (mappedPosts.length > 0) {
                return new SetPosts(mappedPosts)
            } else {
                return new SetPosts([]);
            }
        })
    );

    ngrxOnInitEffects(): Action {
        return new FetchPosts({pageSize: 2, currentPage: 1});
    }

    constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {
    }
}
