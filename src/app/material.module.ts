import {NgModule} from "@angular/core";
import {MatButtonModule, MatCardModule, MatInputModule} from "@angular/material";

@NgModule({
    imports: [
        MatInputModule,
        MatCardModule,
        MatButtonModule
    ],
    exports: [
        MatInputModule,
        MatCardModule,
        MatButtonModule
    ]
})
export class MaterialModule {
}
