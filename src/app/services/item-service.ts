import { Injectable } from "@angular/core";

import { FoodItem } from "../Item/item";
import { JSONService } from "./json-service";
import { FoodType } from "../enums/food-type";
import { Initilaisiable } from "../initialisable";

@Injectable()
export class ItemService extends Initilaisiable {
    private readonly jsonService: JSONService

    private foodItems: { [Name: string]: FoodItem | undefined } = {};
    
    private length: number;
    Length() : number {
      return this.length;
    }
  
    constructor(_jsonService: JSONService) {
        super();
        this.jsonService = _jsonService;

        this.length = 0;
    }

    public async loadItems() : Promise<void> {
        if(!this.IsInitialised) {
            return;
        }

        await this.jsonService.loadItems((name: string, value: string) => {
            var item: FoodItem = JSON.parse(value);
            this.foodItems[name] = item;
            this.length++;
        });
        this.initialise();
    }

    public getItem(name: string) : FoodItem | undefined{
        if(!this.IsInitialised())
            return undefined;

        return this.foodItems[name];
    }
}