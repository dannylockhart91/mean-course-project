import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from "@ngrx/store";

import {MaterialModule} from './material.module';
import {AppComponent} from './app.component';
import {PostsComponent} from './posts/posts.component';
import {PostCreateComponent} from './posts/post-create/post-create.component';
import {HeaderComponent} from "./header/header.component";
import {PostListComponent} from "./posts/post-list/post-list.component";
import {reducers} from "./store/app.reducers";
import {FlexLayoutModule} from "@angular/flex-layout";
import {EffectsModule} from "@ngrx/effects";
import {PostsEffects} from "./posts/store/posts.effects";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    declarations: [
        AppComponent,
        PostsComponent,
        PostCreateComponent,
        PostListComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MaterialModule,
        HttpClientModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([PostsEffects])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
