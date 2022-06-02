import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogueService } from './catalogue.service'
import { BasketState } from 'shared/states/produit-state';
import { Select } from '@ngxs/store';
import { UserService } from './user/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @Select(BasketState.countProducts) countProducts$: Observable<number>;

  constructor(private service: CatalogueService, private userService: UserService ) { }

  ngOnInit(): void {
    this.userService.loadCurrentUser();
  }

  ngOnDestroy(): void {
  }
}
