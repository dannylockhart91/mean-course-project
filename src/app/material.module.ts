import {NgModule} from "@angular/core";
import {
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule, MatListModule, MatPaginatorModule, MatProgressSpinnerModule,
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
        MatListModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
    ],
    exports: [
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        MatIconModule,
        MatTooltipModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
    ]
})
export class MaterialModule {
}
