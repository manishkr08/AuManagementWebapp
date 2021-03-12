import { Component, OnInit } from '@angular/core';
import { ProgressService } from './progress.service';

@Component({
  selector: 'app-progress-indicator',
  templateUrl: './progress-indicator.component.html',
  styleUrls: ['./progress-indicator.component.scss'],
})
export class ProgressIndicatorComponent implements OnInit {
  isProgressing = false;

  constructor(private progress: ProgressService) {}

  ngOnInit(): void {
    this.progress.getLoadingStatus().subscribe((data) => {
      this.isProgressing = data;
    });
  }
}
