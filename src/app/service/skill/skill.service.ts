import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import paths from 'src/app/common/data/Paths';
import Skill from 'src/app/model/Skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private http: HttpClient) { }

  getAllSkills() {
    return this.http.get<Skill[]>(`${paths.BASE_URL}${paths.GET_ALL_SKILLS}`);
  }
}
