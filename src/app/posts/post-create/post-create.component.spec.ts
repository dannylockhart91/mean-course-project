import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PostCreateComponent} from './post-create.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('PostCreateComponent', () => {
    let component: PostCreateComponent;
    let fixture: ComponentFixture<PostCreateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, MaterialModule, BrowserAnimationsModule],
            declarations: [PostCreateComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PostCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
