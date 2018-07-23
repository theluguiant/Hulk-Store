import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.css']
})
export class CustomButtonComponent implements OnInit {

  public textButton: string;
  public classButton: string;
  public statusSubmit: boolean;
  public type: string;

  constructor() { }

  ngOnInit() {
  }

  @Input()
      set ButtonClass(classinput: string ) {
        this.classButton = classinput;
      }
      get ButtonClass() {
        return this.classButton;
      }

  @Input()
      set TextButton(textbutton: string ) {
        this.textButton = textbutton;
      }
      get TextButton() {
        return this.textButton;
      }

  @Input()
      set SubmitVal(statusval: boolean ) {
        this.statusSubmit = statusval;
      }
      get SubmitVal() {
        return this.statusSubmit;
      }

  @Input()
      set ButtonType(typetext: string ) {
        this.type = typetext;
      }
      get ButtonType() {
        return this.type;
      }

}
