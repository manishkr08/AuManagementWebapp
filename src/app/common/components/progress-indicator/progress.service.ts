import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  isLoadingBS = new BehaviorSubject(false);
  isLoading = this.isLoadingBS.asObservable();

  constructor() {}

  getLoadingStatus() {
    return this.isLoading;
  }

  setLoadingStatus(value: boolean) {
    this.isLoadingBS.next(value);
  }
}
