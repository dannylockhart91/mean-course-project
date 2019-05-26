import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

import {Action, Store} from "@ngrx/store";
import {Actions, Effect, ofType, OnInitEffects} from "@ngrx/effects";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";

import {
    AddPostFailed,
    AddPostRequest,
    AddPostSuccess,
    DeletePostRequest, DeletePostFailed, DeletePostSuccess,
    FetchPosts,
    PostsActionTypes, SetIsLoading,
    SetPosts, UpdatePostFailed,
    UpdatePostRequest, UpdatePostSuccess
} from "./posts.actions";
import {Post} from "../post.model";
import * as fromApp from "../../store/app.reducers";
import {UiService} from "../../shared/ui.service";

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
                    this.uiService.showSnackBarError('Error Adding Post', 3500);
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
                this.uiService.showSnackBarSuccess('Post Added Successfully', 5000);
                return new AddPostSuccess(post);
            } else {
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
                    this.uiService.showSnackBarError('Error Updating Post', 3500);
                    return of({message: ''})
                })
            );
        }),
        map((response: { message: string, post: Post }) => {
            if (response.message !== '' && response.post !== null) {
                this.uiService.showSnackBarSuccess('Post Updated Successfully', 5000);
                return new UpdatePostSuccess(response.post);
            } else {
                return new UpdatePostFailed();
            }
        })
    );

    @Effect()
    deletePost$ = this.actions$.pipe(
        ofType<DeletePostRequest>(PostsActionTypes.DeletePostRequest),
        map((action: DeletePostRequest) => {
            return action.payload
        }),
        switchMap((id: string) => {
            return this.http.delete<{ message: string, postId: string }>('http://localhost:3000/api/posts/' + id).pipe(
                catchError((err: HttpErrorResponse) => {
                    console.log(err);
                    this.uiService.showSnackBarError(`Error Deleting Post - ${err.statusText}`, 5000);
                    return of({message: ''});
                })
            );
        }),
        map((data: { message: string, postId: string }) => {
            if (data.message !== '') {
                this.uiService.showSnackBarSuccess('Post Deleted Successfully', 5000);
                return new DeletePostSuccess(data.postId);
            } else {
                return new DeletePostFailed();
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
        switchMap((pageInfo: { pageSize: number, currentPage: number }) => {
            const queryParams = `?pageSize=${pageInfo.pageSize}&page=${pageInfo.currentPage}`;
            return this.http.get<{ message: string, posts: any, maxPosts: number }>('http://localhost:3000/api/posts' + queryParams).pipe(
                catchError((err) => {
                    console.log(err);
                    this.uiService.showSnackBarError('Error Fetching Posts', 3500);
                    return of({message: '', posts: null})
                })
            );
        }),
        map((postData: { message: string, posts: any, maxPosts: number }) => {
            if (postData.posts !== null) {
                return {
                    posts: postData.posts.map((post) => {
                        return {
                            id: post._id,
                            title: post.title,
                            content: post.content,
                            timeCreated: post.timeCreated,
                            updated: post.updated != -1 ? post.updated : null,
                            imagePath: post.imagePath,
                            creator: post.creator
                        }
                    }), maxPosts: postData.maxPosts
                }
            } else {
                return []
            }
        }),
        map((mappedPosts: { posts: Post[], maxPosts: number }) => {
            if (mappedPosts.posts.length > 0) {
                return new SetPosts({posts: mappedPosts.posts, maxPosts: mappedPosts.maxPosts});
            } else {
                return new SetPosts(null);
            }
        })
    );

    ngrxOnInitEffects(): Action {
        return new FetchPosts({pageSize: 2, currentPage: 0});
    }

    constructor(private actions$: Actions,
                private uiService: UiService,
                private http: HttpClient,
                private store: Store<fromApp.AppState>) {
    }
}
