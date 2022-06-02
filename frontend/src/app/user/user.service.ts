import { IUser } from 'shared/models/User';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  baseUrl = "https://tp05-jonathan.herokuapp.com/api/";
  private currentUserSource = new BehaviorSubject<IUser | null>(null);

  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  getCurrentUserValue() {
    return this.currentUserSource
  }

  loadCurrentUser() {
    let userJson = localStorage.getItem('user');
    let user = JSON.parse(userJson);

    if (user) this.currentUserSource.next(user);
  }

  login(dataForm: any) {
    let data: String = "";

    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };

    data = 'login=' + dataForm.login + "&password=" + dataForm.password;

    return this.http.post<IUser>(this.baseUrl + 'login', data, httpOptions).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }
      })

    );
  }

  register(dataForm: any) {
    let data: String = "";

    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };

    data = 'login=' + dataForm.login + "&password=" + dataForm.password + "&email=" + dataForm.email;;

    return this.http.post<IUser>(this.baseUrl + 'signup', data, httpOptions).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/login');
  }
}
