import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-alertsdiv',
  templateUrl: './alertsdiv.component.html',
  styleUrls: ['./alertsdiv.component.css']
})
export class AlertsdivComponent implements OnInit {

  public textAlert: string;
  public classAlert: string;
  public statusSubmit: string;
  public beenToCompare: string;

  constructor() { }

  ngOnInit() {
  }

  @Input()
      set AlertClass(alertclass: string ) {
        this.classAlert = alertclass;
      }
      get AlertClass() {
        return this.classAlert;
      }

  @Input()
      set TextAlert(textalert: string ) {
        this.textAlert = textalert;
      }
      get TextAlert() {
        return this.textAlert;
      }

  @Input()
      set SubmitVal(statusval: string ) {
        this.statusSubmit = statusval;
      }
      get SubmitVal() {
        return this.statusSubmit;
      }

  @Input()
      set BeenToCompare(stringcompare: string ) {
        this.beenToCompare = stringcompare;
      }
      get BeenToCompare() {
        return this.beenToCompare;
      }

}
