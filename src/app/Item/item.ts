import { FoodType } from "../enums/food-type"
import { ItemData } from "./itemData";
import { INameable } from "../interfaces/I-namebale";

export class FoodItem implements INameable
{
    private readonly name: string;
    public Name(): string {
        return this.name;
    }

    private readonly cost: number;
    public Cost(): number {
        return this.cost;
    }

    private readonly isVeg: boolean;
    public IsVeg(): boolean {
        return this.isVeg;
    }

    private readonly imageSrc: string;
    public ImageSrc(): string {
        return this.foodType;
    }

    private readonly foodType: FoodType;
    public FoodType(): FoodType {
        return this.foodType;
    }

    constructor(_name: string, _cost: number, _isVeg: boolean, _imgSrc: string, _foodType: FoodType)
    {
        this.name = _name;
        this.cost = _cost;
        this.isVeg = _isVeg;
        this.imageSrc = _imgSrc;
        this.foodType = _foodType
    }

    public toItemData() : ItemData {
        return new ItemData(this.name, this.cost, this.isVeg, this.imageSrc, this.foodType.toString());
    }
}