import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentSearchComponent } from './assessment-search.component';

describe('AssessmentSearchComponent', () => {
  let component: AssessmentSearchComponent;
  let fixture: ComponentFixture<AssessmentSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
