import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Store} from "@ngrx/store";

import {SignInRequest} from "../store/auth.actions";
import * as fromAuth from "../store/auth.reducer";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
    email: string = '';
    password: string = '';

    constructor(private store: Store<fromAuth.AuthState>) {
    }

    ngOnInit() {
    }

    onLogin(form: NgForm): void {
        this.store.dispatch(new SignInRequest({email: form.value.email, password: form.value.password}));
    }

}
