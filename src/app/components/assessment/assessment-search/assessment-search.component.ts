import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Assessment from 'src/app/model/Assessment';
import CreateAssessmentMode from 'src/app/model/enums/CreateAssessmentMode';
import Tag from 'src/app/model/Tag';
import { AssessmentService } from 'src/app/service/assessment/assessment.service';
import { CreateAssessmentService } from '../create-assessment/create-assessment.service';

@Component({
  selector: 'app-assessment-search',
  templateUrl: './assessment-search.component.html',
  styleUrls: ['./assessment-search.component.scss'],
})
export class AssessmentSearchComponent implements OnInit {
  assessments: Assessment[] = [];
  searchQuery = new FormControl('');

  constructor(
    private router: Router,
    private assessmentService: AssessmentService,
    private createAssessmentService: CreateAssessmentService
  ) {}

  ngOnInit(): void {
    this.assessmentService.fetchAssessments();
    this.assessmentService.getAllAssessment().subscribe((data) => {
      this.assessments = data;
    });

    this.searchQuery.valueChanges.subscribe((data) => {
      this.assessmentService.filterByQuery(data);
    });
  }

  navigateToAssessment(event: Event) {
    this.createAssessmentService.setAssessment({});
    this.createAssessmentService.setCreateAssessmentMode(CreateAssessmentMode.NEW)
    this.router.navigate(['app/assessment/create']);
  }

  searchTag(event: Tag) {
    console.log(event);
    this.searchQuery.setValue(event.name);
  }

  clearSearchQuery(event: Event) {
    this.searchQuery.setValue('');
  }
}
