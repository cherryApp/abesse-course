import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {

  user: User = new User();

  constructor(
    private ar: ActivatedRoute,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.ar.snapshot.data.editable) {
      this.userService.getOne(this.ar.snapshot.params.id).toPromise().then(
        user => this.user = user
      );
    }
  }

  onSave(ngForm: NgForm) {
    const user: User = (ngForm.value as User);
    if (this.ar.snapshot.data.editable) {
      this.userService.update(this.user.id, user).toPromise().then(
        () => history.back(),
        err => alert(err.message)
      );
    } else {
      this.userService.create(user).toPromise().then(
        () => this.router.navigate(['users']),
        err => alert(err.message)
      );
    }
  }

}
