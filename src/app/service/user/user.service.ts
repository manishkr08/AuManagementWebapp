import {
  HttpClient,
  HttpHeaderResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import UserDetails from 'src/app/model/UserDetails';
import OperationStatus from 'src/app/model/OperationStatus';
import paths from 'src/app/common/data/Paths';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  curUser: UserDetails = {};

  constructor(private http: HttpClient) {}

  // register new user
  registerUser(user: UserDetails) {
    return this.http.post<OperationStatus>(
      `${paths.BASE_URL}${paths.REGISTER_USER}`,
      user,
      httpOptions
    );
  }

  // get login credentials with email
  getUserDetails(email: string) {
    return this.http.get<UserDetails>(
      `${paths.BASE_URL}${paths.USER_DETAILS_BY_EMAIL}/${email}`
    );
  }

  setCurUser(user: UserDetails) {
    this.curUser = user;
  }

  getCurrentUser() {
    return this.curUser;
  }
}
