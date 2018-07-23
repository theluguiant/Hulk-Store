import { Component, OnInit , Input , Output } from '@angular/core';

@Component({
  selector: 'app-span-error',
  templateUrl: './span-error.component.html',
  styleUrls: ['./span-error.component.css']
})
export class SpanErrorComponent implements OnInit {

  public status: string;
  public errorRegister: string;

  constructor() { }

  ngOnInit() {
  }

  @Input()
      set ErrorStatus(errorstatus: string ) {
        this.status = errorstatus;
      }
      get ErrorStatus() {
        return this.status;
      }

  @Input()
      set ErrorMsn(errormsn: string ) {
        this.errorRegister = errormsn;
      }
      get ErrorMsn() {
        return this.errorRegister;
      }

}
