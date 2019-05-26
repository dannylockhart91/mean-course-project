import {Component, OnDestroy, OnInit} from "@angular/core";
import {PageEvent} from "@angular/material";
import {Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {Observable, Subscription} from "rxjs";

import {Post} from "../post.model";

import {DeletePostRequest, FetchPosts, SetEditingPost} from "../store/posts.actions";
import * as fromApp from '../../store/app.reducers';
import {map} from "rxjs/operators";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
    posts$: Observable<Post[]>;
    isAuthenticated$: Observable<boolean>;
    userId$: Observable<string>;
    postPerPageSubscription: Subscription;
    currentPageSubscription: Subscription;
    totalPostsSubscription: Subscription;

    postsPerPage: number = 2;
    currentPage: number = 0;
    totalPosts: number = 10;
    isLoading$: Observable<boolean>;

    constructor(private router: Router, private store: Store<fromApp.AppState>) {
    }

    ngOnInit(): void {
        this.isLoading$ = this.store.pipe(select(fromApp.getIsLoading));
        this.posts$ = this.store.pipe(select(fromApp.getPosts));
        this.postPerPageSubscription = this.store.pipe(select(fromApp.getPostPerPage)).subscribe(
            ((data: number) => {
                this.postsPerPage = data;
            })
        );
        this.currentPageSubscription = this.store.pipe(select(fromApp.getCurrentPage)).subscribe(
            ((data: number) => {
                this.currentPage = data
            })
        );
        this.totalPostsSubscription = this.store.pipe(select(fromApp.getTotalPosts)).subscribe(
            ((totalNumOfPosts: number) => {
                this.totalPosts = totalNumOfPosts;
            })
        );
        this.isAuthenticated$ = this.store.pipe(select(fromApp.getIsAuth));
        this.userId$ = this.store.pipe(select(fromApp.getUserId));
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
        this.store.dispatch(new DeletePostRequest(post.id));
    }

    /**
     * Function called on pageEvent when the user changes the current page
     * through the mat-paginator
     * @param pageData The page change event
     */
    onPageChange(pageData: PageEvent) {
        this.store.dispatch(new FetchPosts({pageSize: pageData.pageSize, currentPage: pageData.pageIndex}));
    }

    ngOnDestroy(): void {
        if (this.postPerPageSubscription) {
            this.postPerPageSubscription.unsubscribe();
        }
        if (this.currentPageSubscription) {
            this.currentPageSubscription.unsubscribe();
        }
        if (this.totalPostsSubscription) {
            this.totalPostsSubscription.unsubscribe();
        }
    }
}
