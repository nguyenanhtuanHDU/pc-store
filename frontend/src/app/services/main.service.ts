import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, distinctUntilChanged, tap } from 'rxjs';
import { IUser } from '../shared/models/user.model';
import { IResponse } from '../shared/models/response.model';
import { ILogin } from '../shared/models/login.model';

@Injectable({
  providedIn: 'root'
})
export class MainService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  loadingSubject = new BehaviorSubject<boolean>(false)
  loading = this.loadingSubject.asObservable().pipe(distinctUntilChanged())

  listUserSubject = new BehaviorSubject<IUser[]>([] as IUser[])
  listUser = this.listUserSubject.asObservable().pipe(distinctUntilChanged())

  activeLoading() {
    this.loadingSubject.next(true)
  }

  hiddenLoading() {
    this.loadingSubject.next(false)
  }

  auth = {
    login: (command: ILogin) => this.http.post<IResponse<any>>(this.createUrl(['auth', 'login']), command),
    loginGoogle: () => this.http.get(this.createUrl(['auth', 'google']))
  }

  users = {
    getAll: (page: number = 1, limit: number = 3, username: string = '', sortBy: string = 'createdAt') => this.http.get<IResponse<IUser[]>>(this.createUrl(['users']),
      {
        params: this.createParams({
          page, limit, username, sortBy
        })
      }
    ).pipe(tap((res) => {
      this.listUserSubject.next(res.data)
    })),
    create: (command: Partial<IUser>) => this.http.post<IResponse<IUser>>(this.createUrl(['users']), command),
    update: (id: string, command: Partial<IUser>, index: number) => this.http.put<IResponse<IUser>>(this.createUrl(['users', id]), command).pipe(tap((res) => {
      this.listUserSubject.getValue().splice(index, 1, res.data)
      this.listUserSubject.next([...this.listUserSubject.getValue()])
    })),
    delete: (id: string) => this.http.delete<IResponse<IUser>>(this.createUrl(['users', id])).pipe(tap((res) => {
      const index = this.listUserSubject.getValue().findIndex(item => item._id === id)
      this.listUserSubject.getValue().splice(index, 1)
      this.listUserSubject.next([...this.listUserSubject.getValue()])
    }))
  }
}