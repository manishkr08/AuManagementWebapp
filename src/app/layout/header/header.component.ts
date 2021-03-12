import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName?: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userName = this.userService.getCurrentUser().firstName;
  }
}
