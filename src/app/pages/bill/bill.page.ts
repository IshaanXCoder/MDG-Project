import { Component } from '@angular/core';

import { AppPage } from '../app-page';

import { BillWidgetController } from './widgets/bill-widget-controller';

import { AppFlowService } from 'src/app/services/app-flow-service';
import { SoundService } from 'src/app/services/sound/sound-affect-service';
import { ItemService } from 'src/app/services/item-management/item-service';
import { CartOrder } from 'src/app/Item/card-order';

@Component({
  selector: 'app-cart',
  templateUrl: './bill.page.html',
  styleUrls: ['./bill.page.scss'],
  providers: [BillWidgetController]
})
export class BillPage extends AppPage<BillWidgetController> {

  private readonly itemService: ItemService;
  private readonly appFlowService: AppFlowService;

  constructor(_appFlowService: AppFlowService, _itemService: ItemService, _widgetController: BillWidgetController, _soundService: SoundService) {
    super(_widgetController, _soundService)

    this.itemService = _itemService;
    this.appFlowService = _appFlowService;
  }

  protected override onInit(): void { }
  protected override viewWillEnter(): void {  }
  protected override async viewDidEnter(): Promise<void> { }

  public getTotal() : number {
    return this.appFlowService.getTotal();
  }

  public getCart() : CartOrder[] {
    return this.appFlowService.getCart();
  }

  public getCount(name: string) : number {
    return this.appFlowService.getCount(name);
  }

  public async increment(name: string | undefined) : Promise<void> {
    if(name == undefined) {
      this.widgetController.presentErrorAlert();
      return;
    }
    
    let item = this.itemService.getItem(name);
    if(item == undefined) {
      this.widgetController.presentErrorAlert();
    }
    else {
      this.appFlowService.addToCart(name);
    }
  }

  public async decrement(name: string | undefined) : Promise<void> {
    if(name == undefined) {
      this.widgetController.presentErrorAlert();
      return;
    }
    
    if(this.appFlowService.getCount(name) == 0) {
      await this.widgetController.presentNoDishToast();
    }
    else {
      this.appFlowService.removeFromCart(name);
    }
  }

  public async removeItem(name: string | undefined) : Promise<void> {
    if(name == undefined) {
      this.widgetController.presentErrorAlert();
      return;
    }
    
    if(this.appFlowService.getCount(name) == 0) {
      await this.widgetController.presentNoDishToast();
    }
    else {
      this.appFlowService.removeFromCart(name);
    }
  }

  public async editOrder() : Promise<void> {
    await this.appFlowService.editOrder();
  }

  public async completeOrder() : Promise<void> {
    await this.appFlowService.completeOrder();
  }

  protected override viewDidLeave(): void { }
}