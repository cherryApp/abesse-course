import { Directive, forwardRef, Input } from '@angular/core';
import { NG_ASYNC_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { map, debounceTime, throttleTime, switchMap } from 'rxjs/operators';

@Directive({
  selector: '[appServerValidator]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: forwardRef( () => ServerValidatorDirective ),
    multi: true
  }]
})
export class ServerValidatorDirective implements Validator {

  lastTimeout: any;
  @Input('appServerValidator') id: string | number;

  constructor(
    private userService: UserService
  ) { }

  validate(control: AbstractControl): Observable<ValidationErrors> {
    return this.userService.validate(`email=${control.value}`).pipe(
      map( users => users.length > 0 ? {emailExistsError: true} : null )
    );


    const lastSubject = new Subject();

    if (this.lastTimeout) {
      clearTimeout(this.lastTimeout);
    }

    this.lastTimeout = setTimeout( () => {
      clearTimeout(this.lastTimeout);
      this.userService.validate(`email=${control.value}`).pipe(
        map( users => users.length > 0 ? {emailExistsError: true} : null )
      ).toPromise().then(
        resp => lastSubject.next(resp)
      );
    }, 1500);

    return lastSubject;
  }

}
