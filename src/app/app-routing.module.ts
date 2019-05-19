import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {PostCreateComponent} from "./posts/post-create/post-create.component";
import {PostListComponent} from "./posts/post-list/post-list.component";
import {SignUpComponent} from "./auth/sign-up/sign-up.component";
import {SignInComponent} from "./auth/sign-in/sign-in.component";
import {AuthGuard} from "./auth/auth.guard";

const routes = [
    {path: '', component: PostListComponent},
    {path: 'sign-up', component: SignUpComponent},
    {path: 'sign-in', component: SignInComponent},
    {path: 'createPost', component: PostCreateComponent, canActivate: [AuthGuard]},
    {path: 'edit/:id', component: PostCreateComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [AuthGuard]
})
export class AppRoutingModule {

}
