import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Subscription, Subject } from 'rxjs';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  listSubscription: Subscription;
  list$: Subject<User | User[]> = this.userService.list$;
  cols: {key: string, label: string, type: string}[] = [
    {key: 'id', label: '#', type: 'plain'},
    {key: 'firstName', label: 'Fname', type: 'text'},
    {key: 'lastName', label: 'Lname', type: 'text'},
    {key: 'email', label: 'Email', type: 'email'},
    {key: 'address', label: 'Add.', type: 'text'},
  ];

  constructor(
    private userService: UserService,
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

}
