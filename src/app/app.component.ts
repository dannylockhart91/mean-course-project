import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";

import {JwtHelperService} from '@auth0/angular-jwt';

import {SetIsAuthenticated} from "./auth/store/auth.actions";
import {UiService} from "./shared/ui.service";

import * as fromApp from './store/app.reducers';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'mean-course-project';

    constructor(private store: Store<fromApp.AppState>,
                private router: Router,
                private uiService: UiService) {
    }

    ngOnInit(): void {
        this.initAuthCheck();
    }

    initAuthCheck() {
        const helper = new JwtHelperService();
        try {
            const token = localStorage.getItem('token');
            if (token) {
                if (!helper.isTokenExpired(token)) {
                    this.store.dispatch(new SetIsAuthenticated({isAuth: true, token: token}));
                    this.router.navigateByUrl('/');
                } else {
                    localStorage.removeItem('token');
                    this.store.dispatch(new SetIsAuthenticated({isAuth: false, token: null}));
                    this.router.navigateByUrl('sign-in');
                    this.uiService.showSnackBarError('Please Login Again', 5000);
                }
            } else {
                this.router.navigateByUrl('sign-in');
            }
        } catch (exception) {
            console.log(exception);
            this.router.navigateByUrl('sign-in');
        }
    }
}
