import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";

import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {first, flatMap} from "rxjs/operators";

import * as fromApp from '../store/app.reducers';
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private store: Store<fromApp.AppState>){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.pipe(select(fromApp.getAuthToken)).pipe(
            first(),
            flatMap(token => {
                const authReq = !!token ? req.clone({
                    headers: req.headers.set('Authorization', 'Bearer ' + token)
                }) : req;
                return next.handle(authReq);
            })
        );
    }
}
