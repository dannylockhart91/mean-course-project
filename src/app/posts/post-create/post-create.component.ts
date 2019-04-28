import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {Subscription} from "rxjs";

import {AddPostRequest, SetEditingPost, UpdatePostRequest} from "../store/posts.actions";
import * as fromApp from '../../store/app.reducers';
import {Post} from "../post.model";
import {mimeType} from './mime-type.validator';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit, OnDestroy {
    isEditing$: Subscription;
    editingPost: Post = null;
    form: FormGroup;
    imagePreview: string;

    constructor(private router: Router, private route: ActivatedRoute,
                private store: Store<fromApp.AppState>) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            'postTitle': new FormControl(null,
                {validators: [Validators.required, Validators.minLength(3)]}),
            'postContent': new FormControl(null,
                {validators: [Validators.required]}),
            'postImage': new FormControl(null,
                {validators: [Validators.required], asyncValidators: [mimeType]})
        });
        this.route.paramMap.subscribe(
            (paramMap: ParamMap) => {
                if (paramMap.has('id')) {
                    this.isEditing$ = this.store.pipe(select(fromApp.getCurrentEditingPost)).subscribe(
                        (post: Post) => {
                            this.editingPost = post;
                        }
                    );
                    this.form.setValue({
                        'postTitle': this.editingPost.title,
                        'postContent': this.editingPost.content,
                        'postImage': this.editingPost.imagePath
                    });
                    this.imagePreview = this.editingPost.imagePath;
                }
            }
        );
    }

    onSavePost() {
        if (!this.editingPost) {
            const post: Post = {
                id: null,
                title: this.form.value.postTitle,
                content: this.form.value.postContent,
                timeCreated: Date.now(),
                updated: null,
                imagePath: null
            };
            this.store.dispatch(new AddPostRequest({post: post, image: this.form.value.postImage}))
        } else {
            const post: Post = {
                id: this.editingPost.id,
                title: this.form.value.postTitle,
                content: this.form.value.postContent,
                timeCreated: this.editingPost.timeCreated,
                updated: Date.now(),
                imagePath: this.editingPost.imagePath
            };
            this.store.dispatch(new UpdatePostRequest({post: post, image: this.form.value.postImage}))
        }
        this.form.reset();
        this.router.navigateByUrl('/', {relativeTo: this.route})
            .then();
    }

    onImageSelected(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];
        if (file) {
            this.form.patchValue({'postImage': file});
            this.form.get('postImage').updateValueAndValidity();
            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreview = <string>reader.result;
            };
            reader.readAsDataURL(file)
        }
    }

    ngOnDestroy(): void {
        if (this.isEditing$) {
            this.store.dispatch(new SetEditingPost(null));
            this.isEditing$.unsubscribe();
        }
    }
}
