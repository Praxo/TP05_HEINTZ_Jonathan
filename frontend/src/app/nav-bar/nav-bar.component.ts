import { IUser } from 'shared/models/User';
import { UserService } from './../user/user.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { BasketState } from 'shared/states/produit-state';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {
  currentUser$: Observable<IUser | null>;

  @Select(BasketState.countProducts) countProducts$: Observable<number>;

  constructor(private userService: UserService) {
    this.currentUser$ = new Observable<IUser>();
  }

  ngOnInit(): void {
    this.currentUser$ = this.userService.currentUser$;
  }

  logout() {
    this.userService.logout();
  }
}
