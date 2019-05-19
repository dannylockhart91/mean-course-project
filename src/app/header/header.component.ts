import {Component, OnInit} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";

import * as fromApp from '../store/app.reducers';
import {Logout} from "../auth/store/auth.actions";
import {Router} from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isAuthenticated$: Observable<boolean>;

    constructor(private store: Store<fromApp.AppState>, private router: Router){}

    ngOnInit(): void {
        this.isAuthenticated$ = this.store.pipe(select(fromApp.getIsAuth));
    }

    onLogout(){
        this.store.dispatch(new Logout);
        this.router.navigateByUrl('/').then();
    }
}
