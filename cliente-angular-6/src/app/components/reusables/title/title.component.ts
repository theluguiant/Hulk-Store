import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
  public title: string;

  constructor() {

  }

  ngOnInit() {
  }

  @Input()
    set Title(message: string ) {
      this.title = message;
    }
    get Title() {
      return this.title;
    }
}
