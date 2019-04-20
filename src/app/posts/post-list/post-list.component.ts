import {Component} from "@angular/core";
import {Observable} from "rxjs";

import * as fromPosts from '../store/posts.reducer';
import {select, Store} from "@ngrx/store";
import {Post} from "../post.model";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
    posts$: Observable<Post[]>;

    constructor(private store: Store<fromPosts.PostsState>){
        this.posts$ = this.store.pipe(select(fromPosts.getPosts))
    }
}
