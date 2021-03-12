import { Component, OnInit } from '@angular/core';
import HomeThumbnail from 'src/app/model/HomeThumbnail';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cards: HomeThumbnail[] = [
    {
      name: 'Opportunities',
      description: 'Opprotunites in accolite',
      icon: 'work',
      link: 'opportunities'
    },
    {
      name: 'Candidates',
      description: 'Manage Candidates',
      icon: 'manage_accounts',
      link: 'candidate'
    },
    {
      name: 'Course',
      description: 'Browse all courses',
      icon: 'school',
      link: 'course'
    },
    {
      name: 'Assessments',
      description: 'Complete assessment for course',
      icon: 'assessment',
      link: 'assessment'
    },
    {
      name: 'Onboarding',
      description: 'OnBoarding process',
      icon: 'flag',
      link: 'onboarding'
    },
    
  ];

  constructor() {}

  ngOnInit(): void {}
}
