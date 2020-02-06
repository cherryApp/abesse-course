// tslint:disable: no-console
import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Subscription, Subject } from 'rxjs';
import { User } from 'src/app/model/user';
import { ConfigService } from 'src/app/service/config.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy, AfterViewChecked {

  listSubscription: Subscription;
  list$ = this.userService.list$.pipe(
    tap( data => {
      console.time('table');
    })
  );
  cols: any[] = this.config.settings$.value.userTable;
  page = 1;

  constructor(
    private userService: UserService,
    private config: ConfigService,
  ) { }

  ngOnInit() {
    this.userService.get();
  }

  ngOnDestroy() { }

  onDelete(user: User) {
    this.userService.delete(user.id).toPromise().then(
      resolve => alert('Delete opeartion successful.'),
      reject => console.error(reject)
    );
  }

  trackByFn(index, row) {
    return row.id;
  }

  ngAfterViewChecked() {
    console.timeEnd('table');
  }

  incrementPage() {
    this.page++;
  }

  onPageChange(event: number): void {
    this.page = event;
  }

}
