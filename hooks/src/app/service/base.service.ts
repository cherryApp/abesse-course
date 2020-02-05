import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T> {

  endPoint: string;
  list$: Subject<T | T[]> = new Subject();

  constructor(
    protected http: HttpClient,
  ) { }

  get(id?: string | number): void {
    this.http.get<T | T[]>(`${this.endPoint}${ id ? ('/' + id) : ''}`).toPromise().then(
      response => this.list$.next(response)
    );
  }

  getOne(id: string | number): Observable<T> {
    return this.http.get<T>(`${this.endPoint}/${id}`);
  }

  create(entity: T): Observable<T> {
    return this.http.post<T>(this.endPoint, entity);
  }

  update(id: string | number, entity: T): Observable<any> {
    return this.http.put(`${this.endPoint}/${id}`, entity);
  }

  delete(id: string | number): Observable<any> {
    return this.http.delete(`${this.endPoint}/${id}`).pipe(
      tap( response => this.get() )
    );
  }
}
