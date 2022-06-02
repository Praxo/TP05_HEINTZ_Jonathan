import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Pizza } from "shared/models/Pizza";
import { AddPizza, RemovePizza, RemoveAllPizza } from "../actions/produit.action";
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
    let pizzaCount = 0;

    state.produits.forEach(pizza => {
      pizzaCount += pizza.quantity;
    });

    return pizzaCount;
  }

  @Action(AddPizza)
  AddProduct(
    { getState, patchState }: StateContext<ProduitStateModel>,
    { payload }: AddPizza
  ) {

    const state = getState()
    if (state.produits.find(elem => elem.nom == payload.nom)) {
      patchState({
        produits: state.produits.map((v: Pizza) => v.nom !== payload.nom ? v : { ...v, quantity: v.quantity + 1 })
      })
    } else {
      patchState({
        produits: [...state.produits, { ...payload, quantity: 1 }]
      })
    }
  }

  @Action(RemovePizza)
  DeleteProduct(
    { getState, patchState }: StateContext<ProduitStateModel>,
    { payload }: RemovePizza
  ) {
    const state = getState()
    if (state.produits.find(elem => elem.nom == payload.nom).quantity > 1) {
      patchState({
        produits: state.produits.map((v: Pizza) => v.nom !== payload.nom ? v : { ...v, quantity: v.quantity - 1 })
      })
    } else {
      patchState({
        produits: state.produits.filter(produit => produit.nom !== payload.nom)
      })
    }
  }

  @Action(RemoveAllPizza)
  DeleteAllProduct(
    { patchState }: StateContext<ProduitStateModel>,
  ) {
    patchState({
      produits: [],
    });
  }
}


