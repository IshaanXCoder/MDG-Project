import { CartOrder } from "./card-order";

import { ItemService } from "../services/item-management/item-service";

export class Cart {
  private readonly itemService : ItemService;

  private readonly orders: CartOrder[];
  public getOrders() : CartOrder[] {
    return this.orders
  }

  constructor(itemService: ItemService) {
    this.orders = [];
    this.itemService = itemService;
  }

  public getCode() : string {
    return this.orders.length + '' + Math.floor(Math.random() * 100);
  }

  public getTotal() : number {
    let final: number = 0;
    this.orders.forEach((value) => {
      final += value.TotalCost();
    });

    return final;
  }

  public clearCart() : void {
    this.orders.length = 0;
  }

  public addToCart(item: string) : void {
    let result = this.findInCart(item);
    if(result != undefined) {
      result.IncrementCount();
    }
    else {
      let result = this.itemService.getItem(item);

      if(result != undefined) {
        this.orders.push(new CartOrder(result));
        this.addToCart(item);
      }   
    }
  }

  public removeFromCart(item: string) : void {
    let result = this.findInCart(item);
    if(result != undefined) {
      result.DecrementCount();
      
      if(result.Count() == 0) {
        this.removeInCart(item);
      }
    }
  }

  public removeAllFromCart(item: string) : void {
    this.removeInCart(item);
  }

  public getCount(item: string) : number {
    let result = this.findInCart(item);
    if(result != undefined) {
      return result.Count();
    }
    else {
      return 0;
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