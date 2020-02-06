import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/model/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

  user: User = null;
  userSub: Subscription;

  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.userSub = this.auth.currentUserSubject.subscribe(
      user => this.user = user
    );
  }

  logout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
