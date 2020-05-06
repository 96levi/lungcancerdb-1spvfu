import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-all-workup',
  templateUrl: './list-all-workup.component.html',
  styleUrls: ['./list-all-workup.component.css']
})
export class ListAllWorkupComponent implements OnInit {
  @Input() stt: number;
  @Input() dateHos: number;
  @Input() switchButton: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
