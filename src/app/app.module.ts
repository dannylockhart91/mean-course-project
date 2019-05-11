import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from "@angular/flex-layout";
import {HttpClientModule} from "@angular/common/http";

import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {reducers} from "./store/app.reducers";
import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {MaterialModule} from './material.module';
import { SignUpComponent } from './Auth/sign-up/sign-up.component';
import { SignInComponent } from './Auth/sign-in/sign-in.component';
import {HeaderComponent} from "./header/header.component";
import {PostsComponent} from './posts/posts.component';
import {PostCreateComponent} from './posts/post-create/post-create.component';
import {PostListComponent} from "./posts/post-list/post-list.component";
import {PostsEffects} from "./posts/store/posts.effects";

@NgModule({
    declarations: [
        AppComponent,
        PostsComponent,
        PostCreateComponent,
        PostListComponent,
        HeaderComponent,
        SignUpComponent,
        SignInComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MaterialModule,
        HttpClientModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([PostsEffects]),
        StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production})
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
