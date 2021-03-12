import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Assessment from 'src/app/model/Assessment';
import Course from 'src/app/model/Course';
import CreateAssessmentMode from 'src/app/model/enums/CreateAssessmentMode';
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
  createAssessmentMode: CreateAssessmentMode = CreateAssessmentMode.NEW;

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
    tags: new FormControl('', []),
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
          prerequisite: [],
        });

        // in case of modify
      } else {
        this.fillFormValuesForEdit();
      }
    });

    // mode weather its edit or new
    this.createAssessmentService.getCreateAssessmentMode().subscribe((data) => {
      this.createAssessmentMode = data;
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
    this.createAssessmentForm.get('type')?.setValue('0');
    this.createAssessmentForm
      .get('maxMarks')
      ?.setValue(this.curAssessment.maxMarks);
  }

  addTagToAssessment(event: Event) {
    const tagFormControl = this.createAssessmentForm.get('tags');
    const value = tagFormControl?.value;

    // if selected is not emplty or not aleady slected
    if (
      value !== '' &&
      !this.curAssessment.tags?.some((tag) => tag.name === value)
    ) {
      const tag = this.tags.filter((tag) => tag.name === value);
      this.curAssessment.tags?.push(tag[0]);
    }
  }

  addSkillToAssessment(event: Event) {
    const skillFormControl = this.createAssessmentForm.get('skills');
    const value = skillFormControl?.value;

    // if selected is not emplty or not aleady slected
    if (
      value !== '' &&
      !this.curAssessment.prerequisite?.some((skill) => skill.name === value)
    ) {
      const skill = this.skills.filter((skill) => skill.name === value);
      this.curAssessment.prerequisite?.push(skill[0]);
    }
  }

  selectCourseForAssessment() {
    const courseName = this.createAssessmentForm.get('course')?.value;
    const selectedcourse = this.courses.filter(
      (value) => value.name === courseName
    );
    this.curAssessment.course = selectedcourse[0];
  }

  cancelCreateAssessment(event: Event) {
    // confirmation for cancelling form
    Swal.fire({
      title: 'Cancel create assessment ?',
      showCancelButton: true,
      confirmButtonText: `Confirm`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['app/assessment']);
      }
    });
  }

  removeChipFromSelectedTag(event: Event, tag: Tag) {
    this.curAssessment.tags = this.curAssessment.tags?.filter(
      (data) => data.id !== tag.id
    );
  }

  removeChipFromSelectedSkill(event: Event, skill: Skill) {
    this.curAssessment.prerequisite = this.curAssessment.prerequisite?.filter(
      (data) => data.id !== skill.id
    );
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

    Swal.fire({
      title: 'Confirm ?',
      showCancelButton: true,
      confirmButtonText: `Confirm`,
    }).then((result) => {
      if (result.isConfirmed) {
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

        this.createAssessmentService.setAssessment(this.curAssessment);

        // if save mode or edit mode
        if (this.createAssessmentMode === CreateAssessmentMode.NEW) {
          this.createAssessmentService.createAssessment().subscribe((data) => {
            Swal.fire({
              icon: data.success ? 'success' : 'error',
              title: data.success ? 'Success' : 'Error',
              text: data.message,
            });
          });

          // if it is edit
        } else {
          this.createAssessmentService.editAssessment().subscribe((data) => {
            Swal.fire({
              icon: data.success ? 'success' : 'error',
              title: data.success ? 'Success' : 'Error',
              text: data.message,
            });
          });
        }

        this.createAssessmentForm.reset();
        this.createAssessmentService.setAssessment({});
        this.router.navigate(['app/assessment']);
      }
    });
  }
}
