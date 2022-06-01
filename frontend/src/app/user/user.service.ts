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

  loadCurrentUser(token: string) {
    let headers = new HttpHeaders;
    headers = headers.set('Authorization', `Bearer ${token}`);

    console.log(token);

    return this.http.get<IUser>(this.baseUrl + 'users', { headers }).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  login(values: IUser) {
    return this.http.post<IUser>(this.baseUrl + 'users/login', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(values: any) {
    return this.http.post<IUser>(this.baseUrl + 'users/register', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/login');
  }
}
