import {NgModule} from "@angular/core";
import {
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule, MatListModule, MatPaginatorModule, MatProgressSpinnerModule, MatSnackBarModule,
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
        MatSnackBarModule,
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
        MatSnackBarModule,
    ]
})
export class MaterialModule {
}
