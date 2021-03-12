import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentTrendComponent } from './assessment-trend.component';

describe('AssessmentTrendComponent', () => {
  let component: AssessmentTrendComponent;
  let fixture: ComponentFixture<AssessmentTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentTrendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
