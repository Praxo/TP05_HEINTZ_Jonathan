import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BasketState } from 'shared/states/produit-state';
import { Pizza } from 'shared/models/Pizza';
import { StoreService } from 'src/app/store.service';
import { RemoveAllPizza } from 'shared/actions/produit.action';
import { IUser } from 'shared/models/User';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  public basketForm!: FormGroup;
  currentUser$: Observable<IUser | null>;

  constructor(public storeService: StoreService, public store: Store, private userService: UserService) {
    this.currentUser$ = new Observable<IUser>();
  }

  ngOnInit(): void {
    this.currentUser$ = this.userService.currentUser$;
  }

  @Select(BasketState.getProduit) produits$: Observable<Pizza[]>

  onSubmit() {
    this.store.dispatch(new RemoveAllPizza());
  }
}
