import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = `http://localhost:3000/users`;

  constructor(
    private http: HttpClient,
  ) { }

  get(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
