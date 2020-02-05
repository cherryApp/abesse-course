import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {

  endPoint = `http://localhost:3000/users`;

  constructor(
    http: HttpClient
  ) {
    super(http);
  }

  validate(queryString: string): Observable<any> {
    return this.http.get(`${this.endPoint}?${queryString}`);
  }

  query(queryString: string): Observable<any> {
    return this.validate(queryString);
  }
}
