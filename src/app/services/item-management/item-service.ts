import { Injectable } from "@angular/core";

import { MENU } from './menu';

import { FoodItem } from "../../Item/item";
import { FoodType } from "../../enums/food-type";
import { Initilaiziable } from "../../initializable";

@Injectable()
export class ItemService extends Initilaiziable {
  private allItems: { [Name: string]: FoodItem  } = {};
  private foodItems: { [Type: string] : { [Name: string]: FoodItem } } = {};
  
  constructor() {
    super();
  }

  public async loadItems() : Promise<void> {
    if(this.IsInitialised()) {
      return;
    }

    Object.values(FoodType).forEach((value) => {
      this.foodItems[value.toString()] = { };
    });

    MENU.menu.forEach((data) => {
      let key = data.foodType as keyof typeof FoodType;
      let item = new FoodItem(data.name, data.cost, data.isVeg, 'assets/images/' + data.name.replace(/\s/g, "") + '.jpeg', FoodType[key]);
            
      this.allItems[data.name] = item;
      this.foodItems[key][data.name] = item;
    });

    this.initialise();
  }

  public getItem(name: string) : FoodItem | undefined {
    try {
      return this.allItems[name];
    }
    catch { 
      return undefined;
    }
  }

  public iterateAllItems(iterate: (rec: FoodItem) => void) : void {
    Object.keys(this.allItems).forEach((key) => { iterate(this.allItems[key]) });
  }

  public iterateAllFoodType(type: FoodType, iterate: (rec: FoodItem) => void) : void {
    Object.keys(this.foodItems[type]).forEach((key) => { iterate(this.allItems[key]) });
  }
}