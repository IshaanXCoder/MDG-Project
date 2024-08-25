import { FoodItem } from "./item";

import { CartOrder } from "./card-order";

export class Cart {

  private readonly orders: CartOrder[];
  public getOrders() : CartOrder[] {
    return this.orders
  }

  constructor() {
    this.orders = [];
  }

  public getCode() : string {
    return this.orders.length + '' + this.getTotal();
  }

  public getTotal() : number {
    return this.orders.reduce((total, item) => total + item.Item().Cost(), 0);
  }

  public clearCart() : void {
    this.orders.length = 0;
  }

  public addToCart(item: FoodItem) : void {
    let result = this.findInCart(item.Name());
    if(result != undefined) {
      result.IncrementCount();
    }
    else {
      this.orders.push(new CartOrder(item));
    }
  }

  public removeFromCart(item: FoodItem) : void {
    let result = this.findInCart(item.Name());
    if(result != undefined) {
      result.DecrementCount();
      
      if(result.Count() == 0) {
        this.removeInCart(item.Name());
      }
    }
  }

  public removeAllFromCart(item: FoodItem) : void {
    for(let i: number =0 ; i < this.orders.length; i++) {
      if(this.orders[i].Name() == item.Name()) {
        this.orders.splice(i, 1);
      }
    }
  }

  public getCount(item: FoodItem) : number {
    let result = this.findInCart(item.Name());
    if(result != undefined) {
      return result.Count();
    }
    else {
      return -1;
    }
  }

  private findInCart(name: string) : CartOrder | undefined {
    for(let i: number =0 ; i < this.orders.length; i++) {
      if(this.orders[i].Name() == name) {
        return this.orders[i];
      }
    }

    return undefined;
  }

  private removeInCart(name: string) : void {
    for(let i: number =0 ; i < this.orders.length; i++) {
      if(this.orders[i].Name() == name) {
        this.orders.splice(i, 1);
      }
    }
  }
}