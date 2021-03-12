import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import Assessment from 'src/app/model/Assessment';
import CreateAssessmentMode from 'src/app/model/enums/CreateAssessmentMode';
import Tag from 'src/app/model/Tag';
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

  @Output() searchTag = new EventEmitter();

  constructor(
    private assessmentService: AssessmentService,
    private router: Router,
    private createAssessmentService: CreateAssessmentService
  ) {}

  ngOnInit(): void {}

  deleteAssessment(event: Event) {
    // confirm delete action
    Swal.fire({
      title: 'Do you really want to delete assessment ?',
      showCancelButton: true,
      confirmButtonText: `Confirm`,
    }).then((result) => {
      if (result.isConfirmed) {
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
    });
  }

  viewScores(event: Event) {
    console.log('going to scores');
    this.assessmentService.setCurAssessmentForResult(this.assessment);
    this.router.navigate([`/app/assessment/score`]);
  }

  editAssessment(event: Event) {
    this.createAssessmentService.setAssessment(this.assessment);
    this.createAssessmentService.setCreateAssessmentMode(
      CreateAssessmentMode.EDIT
    );
    this.router.navigate(['/app/assessment/create']);
  }

  searchByTag(event: Event, tag: Tag) {
    this.searchTag.emit(tag);
  }
}
