import { Router } from "@angular/router";
import { Injectable, NgZone } from "@angular/core";

import { ItemService } from "./item-management/item-service";

import { PageEnum } from "../enums/page-enum";

import { Initilaiziable } from "../initializable";
import { CartOrder } from "../Item/card-order";
import { Cart } from "../Item/cart";
import { FoodItem } from "../Item/item";

@Injectable()
export class AppFlowService extends Initilaiziable  {
  private readonly router: Router;
  private readonly ngZone: NgZone;
    
  private readonly itemService : ItemService;

  private readonly cart: Cart;
  private currentPage: PageEnum;

  constructor(_router: Router, _ngZone: NgZone, _itemService: ItemService) {
    super();

    this.router =_router;
    this.ngZone = _ngZone;
    this.itemService = _itemService;

    this.cart = new Cart();
    this.currentPage = PageEnum.splashscreen;
  }

  public async loadApplication() : Promise<void> {
    if(this.IsInitialised())
      return;

    await this.itemService.loadItems();
    if(this.itemService.IsInitialised())
      this.initialise();

    this.navigate(PageEnum.order);
  }

  public getCode() : string {
    return this.cart.getCode();
  }

  public getTotal() : number {
    return this.cart.getTotal();
  }

  public getCount(item: FoodItem): number {
    return this.cart.getCount(item);
  }

  public addToCart(item: FoodItem): void {
    this.cart.addToCart(item);
  }

  public removeFromCart(item: FoodItem): void {
    this.cart.removeFromCart(item);
  }

  public removeAllFromCart(item: FoodItem): void {
    this.cart.removeAllFromCart(item);
  }

  public getCart() : CartOrder[] {
    return this.cart.getOrders();
  }

  public async newOrder() : Promise<void> {
    this.cart.clearCart();

    await this.navigate(PageEnum.order);
  }

  public async finaliseOrder() : Promise<void> {
    if(this.currentPage != PageEnum.order) {
      return;
    }

    await this.navigate(PageEnum.bill);
  }

  public async editOrder() : Promise<void> {
    if(this.currentPage != PageEnum.bill) {
      return;
    }
      
    await this.navigate(PageEnum.order);
  }

  public async completeOrder() : Promise<void> {
    if(this.currentPage != PageEnum.bill) {
      return;
    }
    
    await this.navigate(PageEnum.thank_you);
  }
  
  private async navigate(next: PageEnum) : Promise<void> {
    if(this.currentPage != next) {
      this.ngZone.run(async() => {
        this.currentPage = next;
        await this.router.navigateByUrl('/' + next);
      });
    }
  }
}

