import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import paths from 'src/app/common/data/Paths';
import Course from 'src/app/model/Course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}

  getAllCourse() {
    return this.http.get<Course[]>(`${paths.BASE_URL}${paths.GET_ALL_COURSE}`);
  }
}
