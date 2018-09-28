import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatCardModule,
  MatDialogModule,
  MatPaginatorModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatChipsModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
  MatGridListModule,
  MatTableModule
} from '@angular/material';
import { HttpModule } from '@angular/http';
import { QuestionviewComponent } from './questionview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('QuestionviewComponent', () => {
  let component: QuestionviewComponent;
  let fixture: ComponentFixture<QuestionviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionviewComponent ],
      imports: [
        MatCardModule,
        MatDialogModule,
        MatPaginatorModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatChipsModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        MatGridListModule,
        MatTableModule,
        HttpModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
