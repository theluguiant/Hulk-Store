import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.css']
})
export class LabelsComponent implements OnInit {

 public nameinput: string;
  public displayString: string;
  constructor() { }

  ngOnInit() {
  }

  @Input()
      set NameInput(textinput: string ) {
        this.nameinput = textinput;
      }
      get NameInput() {
        return this.nameinput;
      }

  @Input()
      set DisplayString(textdisplay: string ) {
          this.displayString = textdisplay;
      }
      get DisplayString() {
        return this.displayString;
      }

}
