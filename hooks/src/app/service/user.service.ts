import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';

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
}
