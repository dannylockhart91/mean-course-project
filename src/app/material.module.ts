import {NgModule} from "@angular/core";
import {
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule, MatTooltipModule
} from "@angular/material";

@NgModule({
    imports: [
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        MatIconModule,
        MatTooltipModule,
    ],
    exports: [
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        MatIconModule,
        MatTooltipModule,
    ]
})
export class MaterialModule {
}
