import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentHomeComponent } from './assessment-home.component';

describe('AssessmentHomeComponent', () => {
  let component: AssessmentHomeComponent;
  let fixture: ComponentFixture<AssessmentHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
