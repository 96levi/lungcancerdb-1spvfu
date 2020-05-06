import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DzClinique';
  visibleSidebar1;
  constructor(private route: Router) { }

  ngOnInit() {
    this.route.navigate(['home']);
  }
}