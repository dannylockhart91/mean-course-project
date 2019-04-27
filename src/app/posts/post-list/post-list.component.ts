import {Component, OnInit} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";

import * as fromApp from '../../store/app.reducers';
import {Post} from "../post.model";
import {DeletePost, SetEditingPost, SetIsLoading} from "../store/posts.actions";
import {Router} from "@angular/router";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
    posts$: Observable<Post[]>;
    isLoading$: Observable<boolean>;

    constructor(private router: Router, private store: Store<fromApp.AppState>){
    }

    ngOnInit(): void {
        this.posts$ = this.store.pipe(select(fromApp.getPosts));
        this.isLoading$ = this.store.pipe(select(fromApp.getIsLoading));
    }

    onEditPost(post: Post){
        this.store.dispatch(new SetEditingPost(post));
    }

    onDeletePost(post: Post){
        this.store.dispatch(new DeletePost(post.id));
    }
}
