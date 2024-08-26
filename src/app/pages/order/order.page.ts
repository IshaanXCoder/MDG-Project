import { Component } from '@angular/core';

import { AppPage } from '../app-page';

import { FoodItem } from 'src/app/Item/item';
import { FoodType } from 'src/app/enums/food-type';
import { CartOrder } from 'src/app/Item/card-order';

import { OrderWidgetController } from './widgets/order-widget-controller';

import { AppFlowService } from 'src/app/services/app-flow-service';
import { SoundEnum } from 'src/app/services/sound/enums/sound-enum';
import { SoundService } from 'src/app/services/sound/sound-affect-service';
import { ItemService } from 'src/app/services/item-management/item-service';

enum FilterFoodType {
  all = 'all',
  soup = FoodType.soup,
  meal = FoodType.meal,
  fried = FoodType.fried,
  bread = FoodType.bread,
  shakes = FoodType.shakes,
  beverage = FoodType.beverage,
  paranthas = FoodType.paranthas,
  continental = FoodType.continental,
}

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  providers: [OrderWidgetController]
})
export class OrderPage extends AppPage<OrderWidgetController> {
  
  private readonly itemService: ItemService;

  private filteredDishes: FoodItem[] = []; 

  private displayDishes: FoodItem[] = []; 
  public DisplayDishes() : FoodItem[] {
    return this.displayDishes;
  }

  public selectedCategory: FilterFoodType = FilterFoodType.meal;

  constructor(appFlowService: AppFlowService, itemService: ItemService, widgetController: OrderWidgetController, soundService: SoundService) {
    super(appFlowService, widgetController, soundService);

    this.itemService = itemService;
  }

  protected override onInit(): void { }
  protected override viewWillEnter(): void { 
    this.selectedCategory = FilterFoodType.all;

    this.filterDishes(this.selectedCategory);
  }

  protected override async viewDidEnter() : Promise<void> { }

  public getCart() : CartOrder[] {
    return this.appFlowService.getCart();
  }

  public getCount(name: string) : number {
    return this.appFlowService.getCount(name);
  }

  public getTotal() : number {
    return this.appFlowService.getTotal();
  }

  public isCartEmpty() : boolean {
    return this.appFlowService.isCartEmpty();
  }

  public playClickSound() : void {
    this.soundService.playSound(SoundEnum.click);
  }

  public async filterDishes(category: string | undefined) : Promise<void> {
    let key = FilterFoodType[category as keyof typeof FilterFoodType];

    this.displayDishes.length = this.filteredDishes.length = 0;
    
    if (category === undefined || category == FilterFoodType.all) {
      this.selectedCategory = FilterFoodType.all;

      this.itemService.iterateAllItems((value) => {
        this.displayDishes.push(value);
        this.filteredDishes.push(value);
      });
    }
    else {
      this.selectedCategory = key;

      this.itemService.iterateAllFoodType(FoodType[category as keyof typeof FoodType], (value) => {
        this.displayDishes.push(value);
        this.filteredDishes.push(value);
      });
    }

    await this.soundService.playSound(SoundEnum.click);
  }

  public async increment(name: string | undefined) : Promise<void> {
    if(name == undefined) {
      this.widgetController.presentErrorAlert();
      await this.soundService.playSound(SoundEnum.error);
      return;
    }
    
    this.appFlowService.addToCart(name);
    await this.soundService.playSound(SoundEnum.click);
  }

  public async decrement(name: string | undefined) : Promise<void> {
    if(name == undefined) {
      this.widgetController.presentErrorAlert();
      await this.soundService.playSound(SoundEnum.error);
      return;
    }
    
    if(this.appFlowService.getCount(name) == 0) {
      await this.widgetController.presentNoDishToast();
    }
    else {
      this.appFlowService.removeFromCart(name);
      await this.soundService.playSound(SoundEnum.click);
    }
  }

  public handleInput(event: any) : void {
    const query = event.target.value.toLowerCase();
    this.displayDishes = this.filteredDishes.filter((d) => d.Name().toLowerCase().indexOf(query) > -1);
  }

  public async finaliseOrder() : Promise<void> {
    if(this.appFlowService.isCartEmpty()) {
      this.widgetController.presentEmptyCartToast();
      await this.soundService.playSound(SoundEnum.message);
      return;
    } 

    await this.soundService.playSound(SoundEnum.click);
    await this.appFlowService.finaliseOrder();
  }

  protected override viewDidLeave(): void { }
}