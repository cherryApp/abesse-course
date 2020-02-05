import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users;
  cols: {key: string, label: string, type: string}[] = [
    {key: 'id', label: '#', type: 'plain'},
    {key: 'firstName', label: 'Fname', type: 'text'},
    {key: 'lastName', label: 'Lname', type: 'text'},
    {key: 'email', label: 'Email', type: 'email'},
    {key: 'address', label: 'Add.', type: 'text'},
  ];
  editable = false;
  phrase = '';
  filterKey = '';

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.get().subscribe(
      users => this.users = users,
      err => console.error(err)
    );
  }

  switchEditable(): void {
    this.editable = !this.editable;
  }

}
