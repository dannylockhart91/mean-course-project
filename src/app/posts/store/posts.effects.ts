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
        switchMap((data: Post) => {
            return this.http.post<{ message: string , post: Post}>('http://localhost:3000/api/posts', data).pipe(
                catchError((err) => {
                    console.log(err);
                    return of({message: '', post: null})
                })
            );
        }),
        map((data: { message: string, post: any }) => {
            if (data.post !== null) {
                const post = {
                    id: data.post._id,
                    title: data.post.title,
                    content: data.post.content,
                    timeCreated: data.post.timeCreated,
                    updated: null
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
        switchMap((post: Post) => {
            return this.http.patch<{message: string, post: Post}>('http://localhost:3000/api/posts/' + post.id, post).pipe(
                catchError((err) => {
                    console.log(err);
                    return of({message: ''})
                })
            );
        }),
        map((response: {message: string, post: Post}) => {
            if(response.message !== ''){
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
            return this.http.delete<{message: string}>('http://localhost:3000/api/posts/' + id).pipe(
                catchError((err) => {
                    console.log(err);
                    return of({message: ''});
                })
            );
        }),
        tap((data: {message: string}) => {
            if(data.message !== ''){
                console.log('Post Deleted');
            } else {
                console.log('Post Not Deleted');
            }
        })
    );

    @Effect()
    fetchPosts$ = this.actions$.pipe(
        ofType<FetchPosts>(PostsActionTypes.FetchPosts),
        tap(() => {
           this.store.dispatch(new SetIsLoading(true));
        }),
        switchMap(() => {
            return this.http.get<{ message: string, posts: any }>('http://localhost:3000/api/posts').pipe(
                catchError((err) => {
                    console.log(err);
                    return of({message: '', posts: null})
                })
            );
        }),
        map((postData: {message: string, posts: any}) => {
            if(postData.posts !== null) {
                return postData.posts.map((post) => {
                    return {
                        id: post._id,
                        title: post.title,
                        content: post.content,
                        timeCreated: post.timeCreated,
                        updated: post.updated
                    }
                })
            } else {
                return []
            }
        }),
        map((mappedPosts: Post[]) => {
            if(mappedPosts.length > 0) {
                return new SetPosts(mappedPosts)
            } else {
                return new SetPosts([]);
            }
        })
    );

    ngrxOnInitEffects(): Action {
        return new FetchPosts();
    }

    constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {
    }
}
