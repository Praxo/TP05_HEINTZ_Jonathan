import { Pizza } from "../models/Pizza";

export class AddProduct {
  static readonly type = 'add product';
  constructor(public payload: Pizza) { }
}

export class RemoveProduct {
  static readonly type = 'remove product';
  constructor(public payload: Pizza) { }
}