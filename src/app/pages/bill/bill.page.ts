import { Component } from '@angular/core';
import { AppPage } from '../app-page';

import { BillWidgetController } from './widgets/bill-widget-controller';
import { AppFlowService } from 'src/app/services/app-flow-service';
import { SoundService } from 'src/app/services/sound/sound-affect-service';
import { CartOrder } from '../order/services/card-order';
import { ItemService } from 'src/app/services/item-management/item-service';

@Component({
  selector: 'app-cart',
  templateUrl: './bill.page.html',
  styleUrls: ['./bill.page.scss'],
  providers: [BillWidgetController]
})
export class BillPage extends AppPage<BillWidgetController> {

  private readonly itemService: ItemService;
  private readonly appFlowService: AppFlowService;

  private cart: CartOrder[] = [];
  public Cart() : CartOrder[] {
    return this.cart;
  }
  
  constructor(_appFlowService: AppFlowService, _itemService: ItemService, _widgetController: BillWidgetController, _soundService: SoundService) {
    super(_widgetController, _soundService)

    this.itemService = _itemService;
    this.appFlowService = _appFlowService;
  }

  protected override onInit(): void { }
  protected override viewWillEnter(): void {  }
  protected override async viewDidEnter(): Promise<void> { }
  protected override viewDidLeave(): void { }

  public getTotal() : number {
    return this.cart.reduce((total, item) => total + item.Item().Cost(), 0);
  }

  public async increment(name: string | undefined) : Promise<void> {
    if(name == undefined) {
      this.widgetController.presentErrorAlert();
      return;
    }
    
    let cartOrder = this.findOrderedDish(name);
    if(cartOrder == undefined) {
      this.widgetController.presentErrorAlert();
    }
    else {
      cartOrder.IncrementCount();
    }
  }

  public async decrement(name: string | undefined) : Promise<void> {
    if(name == undefined) {
      this.widgetController.presentErrorAlert();
      return;
    }
    
    let cartOrder = this.findOrderedDish(name);
    if(cartOrder == undefined) {
      await this.widgetController.presentNoDishToast();
    }
    else {
      cartOrder.DecrementCount();
      if(cartOrder.Count() == 0) {
        this.cart.splice(this.cart.indexOf(cartOrder, 0), 1);
      }
    }
  }

  public async removeItem(name: string | undefined): Promise<void> {
    for(let i: number = 0; i < this.cart.length; i++) {
      if(this.cart[i].Name() == name) {
        this.cart.splice(i, 1);
        break;
      } 
    }

    await this.widgetController.presentNoDishToast();
  }

  public async editOrder() : Promise<void> {
    await this.appFlowService.editOrder(this.cart);
  }

  public async completeOrder() : Promise<void> {
    await this.appFlowService.completeOrder(this.cart);
  }

  private findOrderedDish(name: string) : CartOrder | undefined {
    for(let i: number = 0; i < this.cart.length; i++) {
      if(this.cart[i].Name() == name) {
        return this.cart[i];
      }
    }

    return undefined;
  }  
}