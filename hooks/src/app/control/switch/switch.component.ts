import { Component, OnInit, forwardRef, Input, HostBinding } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef( () => SwitchComponent ),
    multi: true
  }]
})
export class SwitchComponent implements OnInit, ControlValueAccessor {

  @Input() disabled = false;
  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.25 : 1;
  }

  value = 1;

  constructor() { }

  ngOnInit() {
  }

  onChange = (val?: boolean) => {};
  onTouched = () => {};

  onSwitchChange(): void {
    if (this.disabled) {
      return;
    }
    const newValue = this.value === 2 ? false : true;
    this.writeValue(newValue);
    this.onChange(newValue);
  }

  writeValue(newValue: boolean) {
    if (newValue === false) {
      this.value = 0;
    } else if (newValue === true) {
      this.value = 2;
    } else {
      this.value = 1;
    }

  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

}
