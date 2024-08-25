import { Injectable } from "@angular/core";

import { FoodItem } from "../../Item/item";
import { FoodType } from "../../enums/food-type";
import { Initilaiziable } from "../../initializable";
import { ItemData } from "src/app/Item/itemData";
import { MENU } from './menu';

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

        var values = Object.values(FoodType);
        for(let i: number = 0; i < values.length; i++)
            this.foodItems[values[i].toString()] = { };

        for(let i: number = 0; i < MENU.menu.length; i++) {
            let data = MENU.menu[i];

            let key = data.foodType as keyof typeof FoodType;
            let item = new FoodItem(data.name, data.cost, data.isVeg, "src/app/assets/images" + data.name.replace(/\s/g, ""), FoodType[key]);
            
            this.allItems[data.name] = item;
            this.foodItems[key][data.name] = item;
        }

        this.initialise();
    }

    public getAllItems() : { [Name: string]: FoodItem } | undefined {
        if(!this.IsInitialised())
            return undefined;

        return this.allItems;
     }

    public getItems(foodType: FoodType) : { [Name: string]: FoodItem } | undefined {
        if(!this.IsInitialised())
            return undefined;

        return this.foodItems[foodType];
    }
}