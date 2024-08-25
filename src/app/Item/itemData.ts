import { FoodType } from "../enums/food-type";

export class ItemData {
    public name: string;
    public cost: number;
    
    public isVeg: boolean;
    public imgsrc: string;
    public foodType: string;

    constructor(_name: string, _cost: number, _isVeg: boolean, _imgsrc: string, _foodType: string) {
        this.name = _name;
        this.cost =_cost;
        this.isVeg = _isVeg;
        this.imgsrc = _imgsrc;
        this.foodType = _foodType;
    }
}