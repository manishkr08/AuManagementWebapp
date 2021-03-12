import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Assessment from 'src/app/model/Assessment';
import AssessmentResult from 'src/app/model/AssessmentResult';
import { AssessmentService } from 'src/app/service/assessment/assessment.service';

@Component({
  selector: 'app-assessment-score',
  templateUrl: './assessment-score.component.html',
  styleUrls: ['./assessment-score.component.scss'],
})
export class AssessmentScoreComponent implements OnInit {
  assessment: Assessment = {};
  results: AssessmentResult[] = [];
  average = 0;
  percentage = 0;

  constructor(
    private assessmentService: AssessmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.assessment = this.assessmentService.getCurAssessmentForResult();

    this.assessmentService.getResultForAssessment().subscribe(data => {
      this.results = data;
      // find average marks
      this.findAverageMarks()
    })
  }

  goBackToAssessment(event: Event) {
    this.router.navigate(['/app/assessment']);
  }

  findAverageMarks() {
    const maxMarks = this.assessment.maxMarks;
    const resultCount = this.results.length;
    const sum = this.results.reduce((acc, cur) => {
      return acc + JSON.parse(JSON.stringify(cur.marks));
    }, 0);

    this.average = (sum / resultCount);
    this.percentage = this.average * 100 / JSON.parse(JSON.stringify(maxMarks));
    this.average = JSON.parse(this.average.toFixed(2));

  }
}
