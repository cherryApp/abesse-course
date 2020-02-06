import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { User } from '../model/user';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'http://localhost:3000';
  loginUrl = `${this.apiUrl}/login`;
  logoutUrl = `${this.apiUrl}/logout`;
  currentUserSubject: BehaviorSubject<User> = new BehaviorSubject(null);
  lastToken: string = null;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
  ) {
    const localUser = localStorage.getItem('currentUser');
    this.currentUserSubject.next( JSON.parse(localUser) );
  }

  catchLoginError(operation: string, result?: any) {
    return (error: any): Observable<any> => {
      return of(result);
    };
  }

  login(email: string, password: string) {
    return this.http.post<{ accessToken: string }>(
      this.loginUrl,
      {email, password}
    ).pipe(
      catchError( this.catchLoginError('postLogin', []) )
    ).pipe( switchMap( response => {
      if (response.accessToken) {
        this.lastToken = response.accessToken;
        return this.userService.query(`email=${email}`);
      }
      return of(null);
    })).pipe(
      tap( user => {
        if (!user) {
          localStorage.removeItem('currentUser');
          this.currentUserSubject.next(null);
        } else {
          user[0].token = this.lastToken;
          localStorage.setItem('currentUser', JSON.stringify(user[0]));
          this.currentUserSubject.next(user[0]);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['login']);
  }
}
