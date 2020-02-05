// tslint:disable: no-input-rename
import { Component, OnInit, Input, Output, EventEmitter, ApplicationRef } from '@angular/core';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss']
})
export class FormControlComponent implements OnInit {

  @Input('inputValue') val: any;
  @Output() changed: EventEmitter<any> = new EventEmitter();

  constructor(
    private applicationRef: ApplicationRef,
  ) { }

  ngOnInit() {
  }

  dataChanged(): void {
    this.changed.emit(this.val);
  }

}
