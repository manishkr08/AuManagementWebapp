import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import HomeThumbnail from 'src/app/model/HomeThumbnail';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() card: HomeThumbnail = {};

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToPage(event: any) {
    this.router.navigate([`app/${this.card.link}`]);
  }
}
