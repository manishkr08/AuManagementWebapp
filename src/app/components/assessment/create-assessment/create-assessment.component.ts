import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Assessment from 'src/app/model/Assessment';
import Course from 'src/app/model/Course';
import Skill from 'src/app/model/Skill';
import Tag from 'src/app/model/Tag';
import { CourseService } from 'src/app/service/course/course.service';
import { SkillService } from 'src/app/service/skill/skill.service';
import { TagsService } from 'src/app/service/tags/tags.service';
import { UserService } from 'src/app/service/user/user.service';
import Swal from 'sweetalert2';
import { CreateAssessmentService } from './create-assessment.service';

@Component({
  selector: 'app-create-assessment',
  templateUrl: './create-assessment.component.html',
  styleUrls: ['./create-assessment.component.scss'],
})
export class CreateAssessmentComponent implements OnInit {
  courses: Course[] = [];
  tags: Tag[] = [];
  skills: Skill[] = [];
  curAssessment: Assessment = {};

  createAssessmentForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(500),
    ]),
    course: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    tags: new FormControl('', [Validators.required]),
    maxMarks: new FormControl('', [
      Validators.required,
      Validators.min(10),
      Validators.max(1000),
    ]),
    skills: new FormControl('', []),
  });

  constructor(
    private courseService: CourseService,
    private tagService: TagsService,
    private router: Router,
    private userService: UserService,
    private createAssessmentService: CreateAssessmentService,
    private skillServic: SkillService
  ) {}

  ngOnInit(): void {
    // load the available courses
    this.courseService.getAllCourse().subscribe((data) => {
      this.courses = data;
    });

    // load available tags
    this.tagService.getAllTags().subscribe((data) => {
      this.tags = data;
    });

    // load available skills
    this.skillServic.getAllSkills().subscribe((data) => {
      this.skills = data;
    });

    // get assessment data in case of modify
    this.createAssessmentService.getAssessment().subscribe((data) => {
      this.curAssessment = data;

      // when new assessment will be created
      if (this.curAssessment.id === undefined) {
        this.createAssessmentService.setAssessment({
          id: 0,
          tags: [],
          version: 1,
          prerequisite: [],
        });

        // in case of modify
      } else {
        console.log(this.curAssessment);
        this.fillFormValuesForEdit();
      }
    });
  }

  fillFormValuesForEdit() {
    this.createAssessmentForm.get('name')?.setValue(this.curAssessment.name);
    this.createAssessmentForm
      .get('description')
      ?.setValue(this.curAssessment.description);
    this.createAssessmentForm
      .get('course')
      ?.setValue(this.curAssessment.course?.name);
    this.createAssessmentForm.get('type')?.setValue("1");
    this.createAssessmentForm
      .get('maxMarks')
      ?.setValue(this.curAssessment.maxMarks);
    this.curAssessment.tags = [{ id: 1, name: 'Abc' }];
  }

  addTagToAssessment(event: Event) {
    const tagFormControl = this.createAssessmentForm.get('tags');
    const value = tagFormControl?.value;
    console.log(value);

    // if selected is not emplty or not aleady slected
    if (
      value !== '' &&
      !this.curAssessment.tags?.some((tag) => tag.name === value)
    ) {
      const tag = this.tags.filter((tag) => tag.name === value);
      this.curAssessment.tags?.push(tag[0]);
    }

    console.log(this.curAssessment);
  }

  addSkillToAssessment(event: Event) {
    const skillFormControl = this.createAssessmentForm.get('skills');
    const value = skillFormControl?.value;
    console.log(value);

    // if selected is not emplty or not aleady slected
    if (
      value !== '' &&
      !this.curAssessment.prerequisite?.some((skill) => skill.name === value)
    ) {
      const skill = this.skills.filter((skill) => skill.name === value);
      this.curAssessment.prerequisite?.push(skill[0]);
    }
    console.log(this.curAssessment);
  }

  selectCourseForAssessment() {
    const courseName = this.createAssessmentForm.get('course')?.value;
    const selectedcourse = this.courses.filter(
      (value) => value.name === courseName
    );
    this.curAssessment.course = selectedcourse[0];
  }

  cancelCreateAssessment(event: Event) {
    this.router.navigate(['app/assessment']);
  }

  submitCreateAssessment(event: Event) {
    event.preventDefault();

    if (!this.createAssessmentForm.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'You need to fill all the required values',
      });
      return;
    }

    // fill values in assessment object
    //name
    this.curAssessment.name = this.createAssessmentForm.get('name')?.value;
    // description
    this.curAssessment.description = this.createAssessmentForm.get(
      'description'
    )?.value;
    // type
    this.curAssessment.type = this.createAssessmentForm.get('type')?.value;
    // course
    this.selectCourseForAssessment();
    // current user id
    this.curAssessment.creatorId = this.userService.getCurrentUser().id;
    // maximum marks
    this.curAssessment.maxMarks = this.createAssessmentForm.get(
      'maxMarks'
    )?.value;
    // date created
    if (!this.curAssessment.dateCreated) {
      this.curAssessment.dateCreated = new Date(Date.now());
    }
    // date modified
    this.curAssessment.dateModified = new Date(Date.now());

    console.log(this.curAssessment);
    this.createAssessmentService.setAssessment(this.curAssessment);
    this.createAssessmentService.createAssessment().subscribe((data) => {
      Swal.fire({
        icon: data.success ? 'success' : 'error',
        title: data.success ? 'Success' : 'Error',
        text: data.message,
      });

      this.createAssessmentForm.reset();
      if (this.curAssessment.tags === undefined) {
        this.createAssessmentService.setAssessment({
          id: 0,
          tags: [],
          version: 1,
          prerequisite: [],
        });
      }
    });
  }
}
