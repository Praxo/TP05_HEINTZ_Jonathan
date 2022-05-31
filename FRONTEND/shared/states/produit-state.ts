import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Pizza } from "shared/models/Pizza";
import { AddProduct, RemoveProduct } from "../actions/produit.action";
import { ProduitStateModel } from "./produit-state-model";

@State<ProduitStateModel>({
  name: 'basket',
  defaults: {
    produits: []
  }
})

export class BasketState {
  @Selector()
  static getProduit(state: ProduitStateModel) {
    return state.produits;
  }
  @Selector()
  static countProducts(state: ProduitStateModel) {
    return state.produits.length;
  }

  @Action(AddProduct)
  AddProduct(
    { getState, patchState }: StateContext<ProduitStateModel>,
    { payload }: AddProduct
  ) {

    const state = getState()
    if (state.produits.find(elem => elem.pizza == payload.pizza)) {
      patchState({
        produits: state.produits.map((v: Pizza) => v.pizza !== payload.pizza ? v : { ...v, quantity: v.quantity + 1 })
      })
    } else {
      patchState({
        produits: [...state.produits, { ...payload, quantity: 1 }]
      })
    }
  }

  @Action(RemoveProduct)
  DeleteProduct(
    { getState, patchState }: StateContext<ProduitStateModel>,
    { payload }: RemoveProduct
  ) {
    const state = getState()
    if (state.produits.find(elem => elem.pizza == payload.pizza).quantity > 1) {
      patchState({
        produits: state.produits.map((v: Pizza) => v.pizza !== payload.pizza ? v : { ...v, quantity: v.quantity - 1 })
      })
    } else {
      patchState({
        produits: state.produits.filter(produit => produit.pizza !== payload.pizza)
      })
    }
  }
}


