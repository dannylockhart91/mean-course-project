import {Component, OnDestroy, OnInit} from "@angular/core";
import {PageEvent} from "@angular/material";
import {Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {Observable, Subscription} from "rxjs";

import * as fromApp from '../../store/app.reducers';
import {Post} from "../post.model";
import {DeletePost, FetchPosts, SetEditingPost} from "../store/posts.actions";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
    posts$: Observable<Post[]>;

    postsPerPage: number = 2;
    currentPage: number = 0;
    totalPosts: number = 10;
    isLoading$: Observable<boolean>;

    constructor(private router: Router, private store: Store<fromApp.AppState>) {
    }

    ngOnInit(): void {
        this.isLoading$ = this.store.pipe(select(fromApp.getIsLoading));
        this.posts$ = this.store.pipe(select(fromApp.getPosts));
    }

    /**
     * Function called when the user attempts to edit the current post
     * @param post The post that is linked to the edit button pressed
     */
    onEditPost(post: Post) {
        this.store.dispatch(new SetEditingPost(post));
    }

    /**
     * Function called when the user selected to delete the post
     * @param post The post that is linked to the delete button pressed
     */
    onDeletePost(post: Post) {
        this.store.dispatch(new DeletePost(post.id));
    }

    /**
     * Function called on pageEvent when the user changes the current page
     * through the mat-paginator
     * @param pageData The page change event
     */
    onPageChange(pageData: PageEvent) {
        console.log(pageData);
        this.currentPage = pageData.pageIndex + 1;
        this.postsPerPage = pageData.pageSize;
        this.store.dispatch(new FetchPosts({pageSize: this.postsPerPage, currentPage: this.currentPage}));
    }
}
