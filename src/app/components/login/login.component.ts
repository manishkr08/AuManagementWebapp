import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user/user.service';
import Swal from 'sweetalert2';
import { ProgressService } from '../../common/components/progress-indicator/progress.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  constructor(
    private progress: ProgressService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  login(event: Event) {
    event.preventDefault();

    // if form not valid
    if (!this.loginForm.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'EmailId or password not valid',
      });
      return;
    }

    // if login credentials are not valid
    this.progress.setLoadingStatus(true);
    this.userService
      .getUserDetails(this.loginForm.get('email')?.value)
      .subscribe((data) => {
        // if user does not exists
        if (data === null) {
          Swal.fire({
            icon: 'error',
            title: 'No user found',
            text: 'User with email id not found',
          });
        }
        // if password is wrong
        else if (this.loginForm.get('password')?.value !== data.password) {
          Swal.fire({
            icon: 'error',
            title: 'Wrong password',
            text: 'Please enter correct password',
          });
        }
        // if everything is correct
        else {
          this.userService.setCurUser(data);
          this.router.navigate(['app']);
        }

        this.progress.setLoadingStatus(false);
      });
  }

  navigateToRegister(event: any) {
    this.router.navigate(['register']);
  }

  loginViaGoogle(event: any) {
    alert('Login Via google');
  }
}
