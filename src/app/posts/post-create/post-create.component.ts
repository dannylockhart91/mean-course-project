import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {select, Store} from "@ngrx/store";

import * as fromApp from '../../store/app.reducers';
import {AddPostRequest, SetEditingPost, UpdatePostRequest} from "../store/posts.actions";
import {Post} from "../post.model";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit, OnDestroy {
    isEditing$: Subscription;
    editingPost: Post = null;

    constructor(private route: ActivatedRoute, private store: Store<fromApp.AppState>) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(
            (paramMap: ParamMap) => {
                if (paramMap.has('id')) {
                    this.isEditing$ = this.store.pipe(select(fromApp.getCurrentEditingPost)).subscribe(
                        (post: Post) => {
                            this.editingPost = post;
                        }
                    );
                }
            }
        );
    }

    onSavePost(form: NgForm) {
        if(!this.editingPost) {
            const post: Post = {
                id: null,
                title: form.value.postTitle,
                content: form.value.postContent,
                timeCreated: Date.now(),
                updated: null
            };
            this.store.dispatch(new AddPostRequest(post))
        } else {
            const post: Post = {
                id: this.editingPost.id,
                title: form.value.postTitle,
                content: form.value.postContent,
                timeCreated: this.editingPost.timeCreated,
                updated: Date.now()
            };
            this.store.dispatch(new UpdatePostRequest(post))
        }
        // resetForm() NOT reset()
        form.resetForm();
    }

    ngOnDestroy(): void {
        if (this.isEditing$) {
            this.store.dispatch(new SetEditingPost(null));
            this.isEditing$.unsubscribe();
        }
    }
}
