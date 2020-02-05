import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onLogin(ngForm: NgForm): void {
    const {email, password} = ngForm.value;
    this.auth.login(email, password).toPromise().then(
      success => this.router.navigate(['']),
      err => alert('Incorrect login data!')
    );
  }

}
