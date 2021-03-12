import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AppComponent } from './app.component';
import { ProgressIndicatorComponent } from './common/components/progress-indicator/progress-indicator.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './layout/header/header.component';
import { AssessmentComponent } from './components/assessment/assessment.component';
import { CardComponent } from './components/home/card/card.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { AssessmentSearchComponent } from './components/assessment/assessment-search/assessment-search.component';
import { AssessmentTrendComponent } from './components/assessment/assessment-trend/assessment-trend.component';
import { AssessmentScoreComponent } from './components/assessment/assessment-score/assessment-score.component';
import { CandidateComponent } from './components/candidate/candidate.component';
import { OpportunitiesComponent } from './components/opportunities/opportunities.component';
import { CourseComponent } from './components/course/course.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AssessmentCardComponent } from './components/assessment/assessment-card/assessment-card.component';
import { CreateAssessmentComponent } from './components/assessment/create-assessment/create-assessment.component';
import { AssessmentHomeComponent } from './components/assessment/assessment-home/assessment-home.component';
import { ScoreCardComponent } from './components/assessment/assessment-score/score-card/score-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProgressIndicatorComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    AssessmentComponent,
    CardComponent,
    MainContentComponent,
    AssessmentSearchComponent,
    AssessmentTrendComponent,
    AssessmentScoreComponent,
    CandidateComponent,
    OpportunitiesComponent,
    CourseComponent,
    OnboardingComponent,
    ProfileComponent,
    FooterComponent,
    AssessmentCardComponent,
    CreateAssessmentComponent,
    AssessmentHomeComponent,
    ScoreCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatRadioModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatTabsModule,
    MatMenuModule,
    MatChipsModule,
    MatAutocompleteModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
