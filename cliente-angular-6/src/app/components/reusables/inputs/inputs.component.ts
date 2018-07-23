import {Component, EventEmitter, OnInit , Input, Output} from '@angular/core';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.css']
})
export class InputsComponent implements OnInit {
  public name: string;
  public type: string;
  public classInput: string;
  public placeholder: string;
  public min_text: number;
  public max_text: number;
  public req: boolean = false;
  public min_number: number;
  public max_number: number;

  @Input() public sharedVar: string;
  @Output() public sharedVarChange = new EventEmitter();

  ngOnInit() {
  }

  constructor() {

  }

  change(newValue) {
    this.sharedVar = newValue;
    this.sharedVarChange.emit(newValue);
  }

  @Input()
      set InputName(nameinput: string ) {
        this.name = nameinput;
      }
      get InputName() {
        return this.name;
      }

  @Input()
      set InputType(typeinput: string ) {
        this.type = typeinput;
      }
      get InputType() {
        return this.type;
      }

  @Input()
      set InputClass(classinput: string ) {
        this.classInput = classinput;
      }
      get InputClass() {
        return this.classInput;
      }

  @Input()
      set InputPlaceHolder(placeholderinput: string ) {
        this.placeholder = placeholderinput;
      }
      get InputPlaceHolder() {
        return this.placeholder;
      }

   @Input()
      set InputMinlenght(min: number ) {
        this.min_text = min;
      }
      get InputMinlenght() {
        return this.min_text;
      }
      
   @Input()
      set InputMaxlenght(max: number ) {
        this.max_text = max;
      }
      get InputMaxlenght() {
        return this.max_text;
      }  

    @Input()
      set InputMin(min: number ) {
        this.min_number = min;
      }
      get InputMin() {
        return this.min_number;
      }  
      
   @Input()
      set InputMax(max: number ) {
        this.max_number = max;
      }
      get InputMax() {
        return this.max_number;
      }      
      
   @Input()
      set InputRequire(req: boolean ) {
        this.req = req;
      }
      get InputRequire() {
        return this.req;
      }   

}
