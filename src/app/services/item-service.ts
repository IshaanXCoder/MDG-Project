import { Injectable } from "@angular/core";

import { FoodItem } from "../Item/item";
import { JSONService } from "./json-service";
import { FoodType } from "../enums/food-type";

@Injectable()
export class ItemService {
    private readonly jsonService: JSONService

    private foodItems : FoodItem[] | undefined = undefined;

    constructor(_jsonService: JSONService) {
        this.jsonService = _jsonService;
    }

    public Intialise() : boolean {
        if(this.foodItems != undefined)
            return false;
        
        this.foodItems = this.jsonService.LoadItems();
        return this.foodItems != undefined;
    }

    public GetItem(name: string) : FoodItem | undefined{
        if(this.foodItems == null)
            return undefined;

        for(let i: number = 0; i < this.foodItems?.length; i++)
            if(this.foodItems[i].Name() == name)
                return this.foodItems[i];

        return undefined;
    }

    public AddItem(name: string, cost: number, isVeg: boolean, foodType: FoodType) : boolean {
        if(this.foodItems == null)
            return false;
        
        if(this.GetItem(name) != undefined)
            return false;

        let newItem: FoodItem = new FoodItem(name, cost, isVeg, foodType);
        
        this.foodItems?.push(newItem);
        return this.jsonService.AddItem(newItem);
    }
}