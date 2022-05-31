import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddProduct, RemoveProduct } from 'shared/actions/produit.action';
import { Pizza } from 'shared/models/Pizza';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor(private store: Store) { }

  public addToBasket(v: Pizza) {
    return this.store.dispatch(new AddProduct(v));
  }

  public deleteToBasket(v: Pizza) {
    return this.store.dispatch(new RemoveProduct(v));
  }
}
