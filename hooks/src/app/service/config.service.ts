import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiUrl = `http://localhost:3000`;
  settings$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient
  ) { }

  init() {
    this.http.get(`${this.apiUrl}/settings`).toPromise().then(
      settings => this.settings$.next(settings)
    );
  }
}
