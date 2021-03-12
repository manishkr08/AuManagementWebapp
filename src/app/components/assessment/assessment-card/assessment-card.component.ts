import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Assessment from 'src/app/model/Assessment';
import { AssessmentService } from 'src/app/service/assessment/assessment.service';
import Swal from 'sweetalert2';
import { CreateAssessmentService } from '../create-assessment/create-assessment.service';

@Component({
  selector: 'app-assessment-card',
  templateUrl: './assessment-card.component.html',
  styleUrls: ['./assessment-card.component.scss'],
})
export class AssessmentCardComponent implements OnInit {
  @Input() assessment: Assessment = {};

  constructor(
    private assessmentService: AssessmentService,
    private router: Router,
    private createAssessmentService: CreateAssessmentService
  ) {}

  ngOnInit(): void {}

  deleteAssessment(event: Event) {
    this.assessmentService
      .deleteAssessmentByIdFromServer(this.assessment.id)
      .subscribe((data) => {
        if (data.success) {
          this.assessmentService.deleteAssessmentByIdFromList(
            this.assessment.id
          );
        }

        Swal.fire({
          icon: data.success ? 'success' : 'error',
          title: data.success ? 'Success' : 'Error',
          text: data.message,
        });
      });
  }

  viewScores(event: Event) {
    console.log('going to scores');
    this.assessmentService.setCurAssessmentForResult(this.assessment);
    this.router.navigate([`/app/assessment/score`]);
  }

  editAssessment(event: Event) {
    this.createAssessmentService.setAssessment(this.assessment)
    this.router.navigate(['/app/assessment/create']);
  }
}
