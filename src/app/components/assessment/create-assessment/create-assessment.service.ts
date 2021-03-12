import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import paths from 'src/app/common/data/Paths';
import Assessment from 'src/app/model/Assessment';
import AssesmentType from 'src/app/model/enums/AssesmentType';
import CreateAssessmentMode from 'src/app/model/enums/CreateAssessmentMode';
import OpertationStatus from 'src/app/model/OperationStatus';

@Injectable({
  providedIn: 'root',
})
export class CreateAssessmentService {
  curAssessmentBS: BehaviorSubject<Assessment> = new BehaviorSubject({});
  curAssessmentObs = this.curAssessmentBS.asObservable();
  createAssessmentModeBS = new BehaviorSubject(CreateAssessmentMode.NEW);
  createAssessmentModeObs = this.createAssessmentModeBS.asObservable()

  constructor(private http: HttpClient) {}

  getCreateAssessmentMode() {
    return this.createAssessmentModeObs;
  }

  setCreateAssessmentMode(mode: CreateAssessmentMode) {
    this.createAssessmentModeBS.next(mode);
  }

  setAssessment(assessment: Assessment) {
    this.curAssessmentBS.next(assessment);
  }

  getAssessment() {
    return this.curAssessmentObs;
  }

  createAssessment() {
    return this.http.post<OpertationStatus>(
      `${paths.BASE_URL}${paths.CREATE_ASSESSMENT}`,
      this.curAssessmentBS.value
    );
  }

  editAssessment() {
    return this.http.put<OpertationStatus>(
      `${paths.BASE_URL}${paths.CREATE_ASSESSMENT}/${this.curAssessmentBS.value.id}`,
      this.curAssessmentBS.value
    );
  }
}
