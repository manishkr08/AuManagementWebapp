import { Component, Input, OnInit } from '@angular/core';
import Assessment from 'src/app/model/Assessment';
import AssessmentResult from 'src/app/model/AssessmentResult';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.scss'],
})
export class ScoreCardComponent implements OnInit {
  @Input() result: AssessmentResult = {};
  @Input() assessment: Assessment = {};

  percentage = 0 ;

  constructor() {}

  ngOnInit(): void {
    const marks = JSON.parse(JSON.stringify(this.result.marks));
    const maxMarks = JSON.parse(JSON.stringify(this.assessment.maxMarks));
    this.percentage = marks*100/maxMarks;
  }

  showFeedback(event: Event) {
    Swal.fire(this.result.feedback);
  }
}
