import { FoodType } from "../enums/food-type"

export class FoodItem
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

    private readonly foodType: FoodType;
    public FoodType(): FoodType {
        return this.foodType;
    }

    constructor(_name: string, _cost: number, _isVeg: boolean, _foodType: FoodType)
    {
        this.name = _name;
        this.cost = _cost;
        this.isVeg = _isVeg;
        this.foodType = _foodType
    }
}