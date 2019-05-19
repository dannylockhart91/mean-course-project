import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";

import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import * as fromApp from '../store/app.reducers';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private store: Store<fromApp.AppState>, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.store.pipe(select(fromApp.getIsAuth)).pipe(
            map((result) => {
                if (result === false) {
                    this.router.navigate(['sign-in'])
                        .then();
                    return false;
                }
                return true;
            })
        );
    }
}
