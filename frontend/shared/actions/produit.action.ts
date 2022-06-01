import { Pizza } from "../models/Pizza";

export class AddPizza {
  static readonly type = 'add pizza';
  constructor(public payload: Pizza) { }
}

export class RemovePizza {
  static readonly type = 'remove pizza';
  constructor(public payload: Pizza) { }
}

export class RemoveAllPizza {
  static readonly type = 'remove all the pizza';
  constructor() { }
}