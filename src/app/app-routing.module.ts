import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentHomeComponent } from './components/assessment/assessment-home/assessment-home.component';
import { AssessmentScoreComponent } from './components/assessment/assessment-score/assessment-score.component';
import { AssessmentComponent } from './components/assessment/assessment.component';
import { CreateAssessmentComponent } from './components/assessment/create-assessment/create-assessment.component';
import { CandidateComponent } from './components/candidate/candidate.component';
import { CourseComponent } from './components/course/course.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { OpportunitiesComponent } from './components/opportunities/opportunities.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'app',
    component: MainContentComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'opportunities',
        component: OpportunitiesComponent,
      },
      {
        path: 'candidate',
        component: CandidateComponent,
      },
      {
        path: 'course',
        component: CourseComponent,
      },
      {
        path: 'assessment',
        component: AssessmentComponent,
        children: [
          {
            path: '',
            component: AssessmentHomeComponent,
          },
          {
            path: 'create',
            component: CreateAssessmentComponent,
          },
          {
            path: 'score',
            component: AssessmentScoreComponent,
          },
        ],
      },
      {
        path: 'onboarding',
        component: OnboardingComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
