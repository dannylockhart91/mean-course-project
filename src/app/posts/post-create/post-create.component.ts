import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromPosts from '../store/posts.reducer';
import {AddPost} from "../store/posts.actions";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
    postTitle: string = '';
    postContent: string = '';

    constructor(private store: Store<fromPosts.PostsState>) {
    }

    ngOnInit() {
    }

    onSavePost() {
        const post = {
            title: this.postTitle,
            content: this.postContent
        };
        this.store.dispatch(new AddPost(post));
        this.postTitle = '';
        this.postContent = '';
    }
}
