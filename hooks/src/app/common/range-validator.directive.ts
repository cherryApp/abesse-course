import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, ValidatorFn, AbstractControl, ValidationErrors, Validator } from '@angular/forms';

export const rangeValidatorFn = (control: AbstractControl, range): ValidationErrors | null => {
  if (!range) {
    return null;
  }

  const min = control.get(range[0]);
  const max = control.get(range[1]);

  if (!min || !max) {
    return null;
  }

  return min.value >= max.value ? {rangeError: 'Minimum value must be lower then the maximum value.'} : null;
};

@Directive({
  selector: '[appRangeValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: RangeValidatorDirective,
    multi: true
  }]
})
export class RangeValidatorDirective implements Validator {

  @Input('appRangeValidator') range: {min: number, max: number};

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    return rangeValidatorFn(control, this.range);
  }

}
