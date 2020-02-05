import { Directive, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, debounce, tap } from 'rxjs/operators';

@Directive({
  selector: '[appInputDebounce]'
})
export class InputDebounceDirective {

  @Input('appInputDebounce') set control(myControl: AbstractControl) {
    if (!myControl) {
      return;
    }

    myControl.valueChanges.pipe(
      tap( data => {
        console.log(data);
      })
    );
  }

  constructor() {

  }

}
