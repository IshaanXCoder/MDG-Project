import { Router } from "@angular/router";
import { Injectable, NgZone } from "@angular/core";

import { ItemService } from "./item-management/item-service";

import { PageEnum } from "../enums/page-enum";

import { Initilaiziable } from "../initializable";
import { CartOrder } from "../pages/order/services/card-order";

@Injectable()
export class AppFlowService extends Initilaiziable  {
  private readonly router: Router;
  private readonly ngZone: NgZone;
    
  private readonly itemService : ItemService;

  private currentPage: PageEnum;
  private currentOrder: CartOrder[];

  constructor(_router: Router, _ngZone: NgZone, _itemService: ItemService) {
    super();

    this.router =_router;
    this.ngZone = _ngZone;
    this.itemService = _itemService;

    this.currentOrder = [];
    this.currentPage = PageEnum.splashscreen;
  }

  public async loadApplication() : Promise<void> {
    if(!this.IsInitialised())
      return;

    this.itemService.loadItems();
    if(this.itemService.IsInitialised())
      this.initialise();
  }

  public async newOrder() : Promise<void> {
    this.clearCurrentOrder();

    await this.navigate(PageEnum.order);
  }

  public async finaliseOrder(order: CartOrder[]) : Promise<void> {
    if(this.currentPage != PageEnum.order) {
      return;
    }

    this.changeCurrentOrder(order);
    await this.navigate(PageEnum.bill);
  }

  public async editOrder(order: CartOrder[]) : Promise<void> {
    if(this.currentPage != PageEnum.bill) {
      return;
    }
      
    this.changeCurrentOrder(order);
    await this.navigate(PageEnum.order);
  }

  public async completeOrder() : Promise<void> {
    await this.navigate(PageEnum.thank_you);
  }

  private clearCurrentOrder()  {
    this.currentOrder.splice(0, this.currentOrder.length);
  }

  private changeCurrentOrder(order: CartOrder[])  {
    this.currentOrder.splice(0, this.currentOrder.length);

    for(let i: number = 0; i < order.length; i++)
      this.currentOrder.push(order[i]);
  }
  
  private async navigate(page: PageEnum) : Promise<void> {
    if(this.currentPage != page) {
      this.ngZone.run(async() => {
        this.currentPage = page;
          await this.router.navigateByUrl('/' + page);
      });
    }
  }
}

