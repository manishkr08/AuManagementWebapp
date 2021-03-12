import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProgressService } from 'src/app/common/components/progress-indicator/progress.service';
import UserDetails from 'src/app/model/UserDetails';
import { UserService } from 'src/app/service/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30),
    ]),
    checkTerms: new FormControl('', []),
  });

  constructor(private router: Router, private userService: UserService, private progress: ProgressService) {}

  ngOnInit(): void {}

  register(event: Event) {
    event.preventDefault();

    // if form not valid
    if (!this.registerForm.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'You need to fill all the required values',
      });
      return;
    }

    // if password do not match
    if (
      this.registerForm.get('password')?.value !==
      this.registerForm.get('confirmPassword')?.value
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Password & Confirm password do not match',
      });
      return;
    }

    // if terms and condition not checked
    if (!this.registerForm.get('checkTerms')?.value) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please accept terms and conditions to continue',
      });
      return;
    }

    // if everything is fine , register user
    this.progress.setLoadingStatus(true);

    const userDetails = {
      id: 0,
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
    };

    this.userService.registerUser(userDetails).subscribe((data) => {
      Swal.fire({
        icon: data.success ? 'success' : 'error',
        title: data.success ? 'Success' : 'Failure',
        text: data.message,
      });

      this.progress.setLoadingStatus(false);
    });
  }

  navigateToSignIn(event: Event) {
    this.router.navigate(['login']);
  }
}
