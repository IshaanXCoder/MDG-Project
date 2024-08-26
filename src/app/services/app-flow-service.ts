import { Router } from "@angular/router";
import { Injectable, NgZone } from "@angular/core";

import { SoundService } from "./sound/sound-affect-service";
import { ItemService } from "./item-management/item-service";

import { PageEnum } from "../enums/page-enum";

import { Initilaiziable } from "../initializable";

import { Cart } from "../Item/cart";
import { CartOrder } from "../Item/card-order";
import { SoundEnum } from "./sound/enums/sound-enum";

@Injectable()
export class AppFlowService extends Initilaiziable  {
  private readonly router: Router;
  private readonly ngZone: NgZone;
    
  private readonly itemService : ItemService;
  private readonly soundService : SoundService;

  private readonly cart: Cart;
  private currentPage: PageEnum;

  constructor(router: Router, ngZone: NgZone, itemService: ItemService, soundService: SoundService) {
    super();

    this.router = router;
    this.ngZone = ngZone;

    this.itemService = itemService;
    this.soundService = soundService;

    this.cart = new Cart(this.itemService);
    this.currentPage = PageEnum.splashscreen;
  }

  public async loadApplication() : Promise<void> {
    if(this.IsInitialised())
      return;

    await this.itemService.loadItems();
    if(this.itemService.IsInitialised())
      this.initialise();

    await this.soundService.initialiseSoundAffects();
    this.navigate(PageEnum.order);
  }

  public getCode() : string {
    return this.cart.getCode();
  }

  public getTotal() : number {
    return this.cart.getTotal();
  }

  public getCart() : CartOrder[] {
    return this.cart.getOrders();
  }

  public isCartEmpty() : boolean {
    return this.cart.getOrders().length == 0;
  }

  public getCount(name: string): number {
    return this.cart.getCount(name);
  }

  public addToCart(item: string): void {
    this.cart.addToCart(item);
  }

  public removeFromCart(item: string): void {
    this.cart.removeFromCart(item);
  }

  public removeAllFromCart(item: string): void {
    this.cart.removeAllFromCart(item);
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

