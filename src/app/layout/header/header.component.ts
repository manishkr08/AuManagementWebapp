import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName?: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userName = this.userService.getCurrentUser().firstName;
  }

  goToProfile(event: Event) {
    this.router.navigate(['/app/profile']);
  }

  logout(event: Event) {
    this.router.navigate(['/']);
  }
}
