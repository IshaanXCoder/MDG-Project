import { Component } from '@angular/core';
import { App } from '@capacitor/app';
import { FoodType } from 'src/app/enums/food-type';
import { OrderWidgetController } from './widgets/order-widget-controller';
import { AppPage } from '../app-page';
import { AppFlowService } from 'src/app/services/app-flow-service';
import { CustomWidgetController } from 'src/app/widgets/custom-widget-controller';
import { SoundService } from 'src/app/services/sound/sound-affect-service';
import { FoodItem } from 'src/app/Item/item';
import { ItemService } from 'src/app/services/item-management/item-service';
import { INameable } from 'src/app/interfaces/I-namebale';
import { CartOrder } from './services/card-order';

enum FilterFoodType {
  all = 'all',
  soup = FoodType.soup,
  fried = FoodType.fried,
  bread = FoodType.bread,
  indian = FoodType.indian,
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
  private readonly appFlowService: AppFlowService;

  private cart: CartOrder[] = [];
  
  public filteredDishes: FoodItem[] = []; 
  public selectedCategory: FilterFoodType = FilterFoodType.all;

  constructor(_appFlowService: AppFlowService, _itemService: ItemService, _widgetController: OrderWidgetController, _soundService: SoundService) {
    super(_widgetController, _soundService);

    this.itemService = _itemService;
    this.appFlowService = _appFlowService;
  }

  protected override onInit(): void { }
  protected override viewWillEnter(): void { 
    this.selectedCategory = FilterFoodType.all;
    
    this.cart = [];
    this.filterDishes(FilterFoodType.all);
  }

  protected override async viewDidEnter() : Promise<void> {  }
  protected override viewDidLeave(): void { }

  public async filterDishes(category: string | undefined) : Promise<void> {
    let key = FilterFoodType[category as keyof typeof FilterFoodType];

    this.filteredDishes = [];
    let allItems : { [Name: string]: FoodItem } | undefined;

    if (category === undefined || category == FilterFoodType.all) {
      allItems  = this.itemService.getAllItems();
      this.selectedCategory = FilterFoodType.all;
    } 
    else {
      allItems = this.itemService.getItems(FoodType[category as keyof typeof FoodType]);
      this.selectedCategory = key;
    }

    if(allItems == undefined) {
      this.widgetController.presentErrorAlert();
      return;
    }

    var values = Object.values(allItems);
    for(let i: number = 0; i < values.length; i++) {
      this.filteredDishes.push(values[i]);
    }
    for(let i: number = 0; i < values.length; i++) {
      this.filteredDishes[i];
    }
  }

  public async incrementDish(name: string | undefined) : Promise<void> {
    if(name == undefined) {
      this.widgetController.presentErrorAlert();
      return;
    }
    
    let cartOrder = this.findOrderedDish(name);
    if(cartOrder == undefined) {
      let result = this.findFilteredDish(name);
      
      if(result == undefined) {
        this.widgetController.presentErrorAlert();
        return;
      }
      else {
        this.cart.push(new CartOrder(result));
      }
    }
    else {
      cartOrder.IncrementCount();
    }
  }

  public async decrementDish(name: string | undefined) : Promise<void> {
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
        const index = this.cart.indexOf(cartOrder, 0);
        if (index > -1) {
          this.cart.splice(index, 1);
        }
      }
    }
  }

  public async finaliseOrder() : Promise<void> {
    await this.appFlowService.finaliseOrder(this.cart);
  }

  private findOrderedDish(name: string ) : CartOrder | undefined {
    return this.findDish(name, this.cart) as CartOrder;
  }

  private findFilteredDish(name: string ) : FoodItem | undefined {
    return this.findDish(name, this.filteredDishes) as FoodItem;
  }

  private findDish<Type extends INameable>(name: string, dishes: Type[] ) : Type | undefined {
    for(let i: number = 0; i < dishes.length; i++) {
      if(dishes[i].Name() == name)
        return dishes[i];
    }

    return undefined;
  }
}