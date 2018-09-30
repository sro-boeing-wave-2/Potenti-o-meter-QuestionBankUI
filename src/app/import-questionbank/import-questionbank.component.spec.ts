import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportQuestionbankComponent } from './import-questionbank.component';

describe('ImportQuestionbankComponent', () => {
  let component: ImportQuestionbankComponent;
  let fixture: ComponentFixture<ImportQuestionbankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportQuestionbankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportQuestionbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
