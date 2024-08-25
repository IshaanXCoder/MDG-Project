import { Component } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage {
  selectedCategory: string = 'all';

  dishes = [
    { name: 'Pizza Margherita', image: 'assets/imgs/pizza-margherita.jpg', category: 'pizza' },
    { name: 'Pepperoni Pizza', image: 'assets/imgs/pepperoni-pizza.jpg', category: 'pizza' },
    { name: 'BBQ Chicken Pizza', image: 'assets/imgs/bbq-chicken-pizza.jpg', category: 'pizza' },
    { name: 'Vegetarian Pizza', image: 'assets/imgs/vegetarian-pizza.jpg', category: 'pizza' },

    { name: 'Chocolate Shake', image: 'assets/imgs/chocolate-shake.jpg', category: 'shakes' },
    { name: 'Vanilla Shake', image: 'assets/imgs/vanilla-shake.jpg', category: 'shakes' },
    { name: 'Strawberry Shake', image: 'assets/imgs/strawberry-shake.jpg', category: 'shakes' },
    { name: 'Mango Shake', image: 'assets/imgs/mango-shake.jpg', category: 'shakes' },
    { name: 'Green Tea Shake', image: 'assets/imgs/green-tea-shake.jpg', category: 'shakes' },
    { name: 'Oreo Shake', image: 'assets/imgs/oreo-shake.jpg', category: 'shakes' },

    { name: 'Coke', image: 'assets/imgs/coke.jpg', category: 'drinks' },
    { name: 'Pepsi', image: 'assets/imgs/pepsi.jpg', category: 'drinks' },
    { name: 'Lemonade', image: 'assets/imgs/lemonade.jpg', category: 'drinks' },
    { name: 'Iced Tea', image: 'assets/imgs/iced-tea.jpg', category: 'drinks' },
    { name: 'Orange Juice', image: 'assets/imgs/orange-juice.jpg', category: 'drinks' },

    { name: 'Apple', image: 'assets/imgs/apple.jpg', category: 'fruits' },
    { name: 'Banana', image: 'assets/imgs/banana.jpg', category: 'fruits' },
    { name: 'Grapes', image: 'assets/imgs/grapes.jpg', category: 'fruits' },
    { name: 'Mango', image: 'assets/imgs/mango.jpg', category: 'fruits' },
    { name: 'Orange', image: 'assets/imgs/orange.jpg', category: 'fruits' },
    { name: 'Pineapple', image: 'assets/imgs/pineapple.jpg', category: 'fruits' },
    { name: 'Strawberry', image: 'assets/imgs/strawberry.jpg', category: 'fruits' },

    { name: 'Naan', image: 'assets/imgs/naan.jpg', category: 'bread' },
    { name: 'Roti', image: 'assets/imgs/roti.jpg', category: 'bread' },
    { name: 'Paratha', image: 'assets/imgs/paratha.jpg', category: 'bread' },
    { name: 'Garlic Naan', image: 'assets/imgs/garlic-naan.jpg', category: 'bread' },
  ];

  filteredDishes = this.dishes;

  filterDishes(category: string | undefined) {
    if (category === undefined || category === 'all') {
      this.filteredDishes = this.dishes;
    } else {
      this.filteredDishes = this.dishes.filter(dish => dish.category === category);
    }
  }
}