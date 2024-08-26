import { Component } from '@angular/core';

import { AppPage } from '../app-page';

import { CartOrder } from 'src/app/Item/card-order';

import { BillWidgetController } from './widgets/bill-widget-controller';

import { AppFlowService } from 'src/app/services/app-flow-service';
import { SoundEnum } from 'src/app/services/sound/enums/sound-enum';
import { SoundService } from 'src/app/services/sound/sound-affect-service';
import { ItemService } from 'src/app/services/item-management/item-service';

@Component({
  selector: 'app-cart',
  templateUrl: './bill.page.html',
  styleUrls: ['./bill.page.scss'],
  providers: [BillWidgetController]
})
export class BillPage extends AppPage<BillWidgetController> {

  private readonly itemService: ItemService;

  constructor(appFlowService: AppFlowService, itemService: ItemService, widgetController: BillWidgetController, soundService: SoundService) {
    super(appFlowService, widgetController, soundService)

    this.itemService = itemService;
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
      await this.soundService.playSound(SoundEnum.error);
      return;
    }
    
    let item = this.itemService.getItem(name);
    if(item == undefined) {
      this.widgetController.presentErrorAlert();
    }
    else {
      this.appFlowService.addToCart(name);
    }

    await this.soundService.playSound(SoundEnum.click);
  }

  public async decrement(name: string | undefined) : Promise<void> {
    if(name == undefined) {
      this.widgetController.presentErrorAlert();
      await this.soundService.playSound(SoundEnum.error);
      return;
    }
    
    this.appFlowService.removeFromCart(name);
    await this.soundService.playSound(SoundEnum.click);
    
    if(this.appFlowService.isCartEmpty()) {
      await this.widgetController.getEmptyResult();
      await this.soundService.playSound(SoundEnum.message);
      await this.editOrder();
    }
  }

  public async removeItem(name: string | undefined) : Promise<void> {
    if(name == undefined) {
      this.widgetController.presentErrorAlert();
      await this.soundService.playSound(SoundEnum.error);
      return;
    }
    
    this.appFlowService.removeAllFromCart(name);
    await this.soundService.playSound(SoundEnum.click);

    if(this.appFlowService.isCartEmpty()) {
      await this.widgetController.getEmptyResult();
      await this.soundService.playSound(SoundEnum.message);
      await this.editOrder();
    }
  }

  public async editOrder() : Promise<void> {
    await this.appFlowService.editOrder();
    await this.soundService.playSound(SoundEnum.click);
  }

  public async completeOrder() : Promise<void> {
    await this.appFlowService.completeOrder();
    await this.soundService.playSound(SoundEnum.click);
  }

  protected override viewDidLeave(): void { }
}