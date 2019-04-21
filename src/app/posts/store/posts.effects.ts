import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {Action} from "@ngrx/store";
import {Actions, Effect, ofType, OnInitEffects} from "@ngrx/effects";

import {FetchPosts, PostsActionTypes, SetPosts} from "./posts.actions";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {Post} from "../post.model";

@Injectable()
export class PostsEffects implements OnInitEffects {

    @Effect()
    fetchPosts$ = this.actions$.pipe(
        ofType<FetchPosts>(PostsActionTypes.FetchPosts),
        switchMap(() => {
            return this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts').pipe(
                catchError((err) => {
                    console.log(err);
                    return of('')
                })
            )
        }),
        map((data: {message: string, posts: Post[]}) => {
            console.log(data.posts);
            return new SetPosts(data.posts);
        })
    );


    ngrxOnInitEffects(): Action {
        return new FetchPosts();
    }
    constructor(private actions$: Actions, private http: HttpClient){
    }
}
