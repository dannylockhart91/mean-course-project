import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {PostCreateComponent} from "./posts/post-create/post-create.component";
import {PostListComponent} from "./posts/post-list/post-list.component";
import {SignUpComponent} from "./auth/sign-up/sign-up.component";
import {SignInComponent} from "./auth/sign-in/sign-in.component";

const routes = [
    {path: '', component: PostListComponent},
    {path: 'sign-up', component: SignUpComponent},
    {path: 'sign-in', component: SignInComponent},
    {path: 'createPost', component: PostCreateComponent},
    {path: 'edit/:id', component: PostCreateComponent},
];

@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}
