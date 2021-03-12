import { HttpClient } from '@angular/common/http';
import { Injectable, Query } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import paths from 'src/app/common/data/Paths';
import Assessment from 'src/app/model/Assessment';
import AssessmentResult from 'src/app/model/AssessmentResult';
import OpertationStatus from 'src/app/model/OperationStatus';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  curAssessmentForResult: Assessment = {};
  allAssessment: Assessment[] = [];
  allAssessmentBS: BehaviorSubject<Assessment[]> = new BehaviorSubject(
    this.allAssessment
  );
  allAssessmentObs = this.allAssessmentBS.asObservable();

  constructor(private http: HttpClient) {}

  resetFiler() {
    this.allAssessmentBS.next(this.allAssessment);
  }

  getAllAssessment() {
    return this.allAssessmentObs;
  }

  fetchAssessments() {
    this.http
      .get<Assessment[]>(`${paths.BASE_URL}${paths.GET_ALL_ASSESSMENT}`)
      .subscribe((data) => {
        this.allAssessmentBS.next(data);
        this.allAssessment = data;
      });
  }

  deleteAssessmentByIdFromServer(id?: number) {
    // delete from server
    return this.http.delete<OpertationStatus>(
      `${paths.BASE_URL}${paths.GET_ALL_ASSESSMENT}/${id}`
    );
  }

  deleteAssessmentByIdFromList(id?: number) {
    // delete from UI
    let filterdAssessment = this.allAssessmentBS.value;
    filterdAssessment = filterdAssessment.filter((as) => as.id !== id);
    this.allAssessmentBS.next(filterdAssessment);
  }

  filterByQuery(query: string) {
    query = query.toLowerCase();
    const filteredValue = this.allAssessment.filter((as) => {
      return (
        as.name?.toLowerCase().includes(query) ||
        as.tags?.some((tag) => tag.name?.toLocaleLowerCase().includes(query))
      );
    });

    this.allAssessmentBS.next(filteredValue);
  }

  setCurAssessmentForResult(assessment: Assessment) {
    this.curAssessmentForResult = assessment;
  }

  getCurAssessmentForResult() {
    return this.curAssessmentForResult;
  }

  getResultForAssessment() {
    return this.http.get<AssessmentResult[]>(
      `${paths.BASE_URL}${paths.GET_RESULT}/${this.curAssessmentForResult.id}`
    );
  }
}
