import { INameable } from "src/app/interfaces/I-namebale";

import { FoodItem } from "src/app/Item/item";

export class CartOrder implements INameable {
    private readonly name: string;
    public Name() : string {
      return this.name;
    }
  
    private readonly item: FoodItem;
    public Item() : FoodItem {
      return this.item;
    }
  
    private count: number;
    public Count(): number {
      return this.count;
    }

    public TotalCost(): number {
      return this.item.Cost() * this.count;
    }
  
    constructor(_foodItem: FoodItem) {
      this.item = _foodItem;
      
      this.count = 0;
      this.name = this.item.Name();
    } 
  
    public IncrementCount() : void {
      this.count++;
    }
  
    public DecrementCount() : void {
      if(this.count == 0) {
        return;
      }
      
      this.count--;
    }
  }
  