import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { QuestionService } from './question.service';

describe('QuestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionService],
      imports: [
        HttpModule
      ]
    });
  });

  it('should be created', inject([QuestionService], (service: QuestionService) => {
    expect(service).toBeTruthy();
  }));
});
