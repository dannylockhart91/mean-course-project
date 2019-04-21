import {Component, OnInit} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";

import * as fromApp from '../../store/app.reducers';
import {Post} from "../post.model";
import {DeletePost} from "../store/posts.actions";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
    posts$: Observable<Post[]>;

    constructor(private store: Store<fromApp.AppState>){
    }

    ngOnInit(): void {
        this.posts$ = this.store.pipe(select(fromApp.getPosts));
    }

    onEditPost(post: Post){
    }

    onDeletePost(post: Post){
        this.store.dispatch(new DeletePost(post));
    }
}
