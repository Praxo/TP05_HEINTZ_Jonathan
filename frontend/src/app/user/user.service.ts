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

    return this.http.get<IUser>(this.baseUrl, { headers }).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  // login(data: any) {
  //   return this.http.post<any>(this.baseUrl + 'login', data).pipe(
  //     map((user: IUser) => {
  //       if (user) {
  //         localStorage.setItem('token', user.token);
  //         this.currentUserSource.next(user);
  //       }
  //     })
  //   );
  // }

  login(dataForm: any) {
    let data: String = "";

    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };

    data = 'login=' + dataForm.login + "&password=" + dataForm.password;

    return this.http.post<IUser>(this.baseUrl + 'login', data, httpOptions);
  }

  register(dataForm: any) {
    let data: String = "";

    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };

    data = 'login=' + dataForm.login + "&password=" + dataForm.password;

    return this.http.post<IUser>(this.baseUrl + 'register', data).pipe(
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
