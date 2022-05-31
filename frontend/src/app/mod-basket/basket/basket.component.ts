import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BasketState } from 'shared/states/produit-state';
import { Pizza } from 'shared/models/Pizza'
import { StoreService } from 'src/app/store.service'

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  constructor(public storeService: StoreService) { }


  ngOnInit(): void {
  }
  @Select(BasketState.getProduit) produits$: Observable<Pizza[]>
}
