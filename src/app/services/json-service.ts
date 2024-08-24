import { promises } from "fs";

import { Injectable } from "@angular/core";

import { FoodItem } from "../Item/item";

@Injectable()
export class JSONService {
    private readonly filePath: string = 'something lmao';

    private items: FoodItem[] | undefined = undefined;

    constructor() {

    }

    public LoadItems() : FoodItem[] | undefined {
        try {
            this.items = JSON.parse(this.filePath);
            return this.items;
        }
        catch {
            return undefined;
        }   
    }

    public AddItem(item: FoodItem): boolean {
        try {
            if(this.items == undefined)
                return false;

            this.items.push(item)
            let json: string = JSON.stringify(this.items);

            promises.writeFile(this.filePath, json, {
                    flag: "w"
                }).then(() => { });
            return true;
        }
        catch {
            return false;
        }
    }

    public RemoveItem(item: FoodItem) : boolean {
        try {
            if(this.items == undefined)
                return false;

            for(let i: number = 0; i < this.items.length; i++)
                if(this.items[i].Name() == item.Name())
                {
                    this.items = this.items.slice(i);
                    let json: string = JSON.stringify(this.items);
        
                    promises.writeFile(this.filePath, json, {
                            flag: "w"
                        }).then(() => { });
                    
                    break;
                }

            return true;
        }
        catch {
           return false;
        }
    }
}