import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Store} from "@ngrx/store";

import * as fromApp from '../../store/app.reducers';
import {AddPost} from "../store/posts.actions";
import {Post} from "../post.model";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

    constructor(private store: Store<fromApp.AppState>) {
    }

    ngOnInit() {
    }

    onSavePost(form: NgForm) {
        const post: Post = {
            id: null,
            title: form.value.postTitle,
            content: form.value.postContent,
            timeCreated: Date.now()
        };
        this.store.dispatch(new AddPost(post));
        // resetForm() NOT reset()
        form.resetForm();
    }
}
