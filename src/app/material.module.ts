import {NgModule} from "@angular/core";
import {MatButtonModule, MatCardModule, MatExpansionModule, MatInputModule, MatToolbarModule} from "@angular/material";

@NgModule({
    imports: [
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
    ],
    exports: [
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
    ]
})
export class MaterialModule {
}
