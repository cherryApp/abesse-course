import { Directive, forwardRef } from '@angular/core';
import { NG_ASYNC_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[appServerValidator]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: forwardRef( () => ServerValidatorDirective ),
    multi: true
  }]
})
export class ServerValidatorDirective implements Validator {

  constructor(
    private userService: UserService
  ) { }

  validate(control: AbstractControl): Observable<ValidationErrors> {
    return this.userService.validate(`email=${control.value}`).pipe(
      map( users => users.length > 0 ? {emailExistsError: true} : null )
    );
  }

}
