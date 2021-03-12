import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import paths from 'src/app/common/data/Paths';
import Tag from 'src/app/model/Tag';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient) { }

  getAllTags() {
    return this.http.get<Tag[]>(`${paths.BASE_URL}${paths.GET_ALL_TAGS}`);
  }
}
