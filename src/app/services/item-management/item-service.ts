import { Injectable } from "@angular/core";

import { FoodItem } from "../../Item/item";
import { FileManager } from "../file-management/file-manager";
import { FoodType } from "../../enums/food-type";
import { Initilaiziable } from "../../initializable";
import { ItemData } from "src/app/Item/itemData";

@Injectable()
export class ItemService extends Initilaiziable {
    private readonly jsonService: FileManager

    private allItems: { [Name: string]: FoodItem  } = {};
    private foodItems: { [Type: string] : { [Name: string]: FoodItem } } = {};
  
    constructor(_jsonService: FileManager) {
        super();
        this.jsonService = _jsonService;
    }

    public async loadItems() : Promise<void> {
        if(!this.IsInitialised) {
            return;
        }

        var values = Object.values(FoodType);
        for(let i: number = 0; i < values.length; i++)
            this.foodItems[values[i].toString()] = { };

        await this.jsonService.loadItems((name: string, value: string) => {
            var data: ItemData = JSON.parse(value);

            if(data.name == undefined)
                return;
            
            let key = data.foodType as keyof typeof FoodType;
            let item = new FoodItem(data.name, data.cost, data.isVeg, data.imgsrc, FoodType[key]);
            this.allItems[name] = item;
            this.foodItems[key][name] = item;
        });

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