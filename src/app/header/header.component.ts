import {Component, OnInit} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";

import * as fromApp from '../store/app.reducers';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isAuthenticated$: Observable<boolean>;

    constructor(private store: Store<fromApp.AppState>){}

    ngOnInit(): void {
        this.isAuthenticated$ = this.store.pipe(select(fromApp.getIsAuth));
    }
}
