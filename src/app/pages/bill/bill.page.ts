import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './bill.page.html',
  styleUrls: ['./bill.page.scss'],
})
export class BillPage {

  // Cart items with name, price, image, and quantity
  cartItems = [
    { name: 'Watermelon', price: 2, image: 'assets/images/watermelon.png', quantity: 2, totalPrice: 4 },
    { name: 'Tomato', price: 2, image: 'assets/images/tomato.png', quantity: 2, totalPrice: 4 },
    { name: 'Cucumber', price: 2, image: 'assets/images/cucumber.png', quantity: 2, totalPrice: 4 },
    { name: 'Spinach', price: 2, image: 'assets/images/spinach.png', quantity: 2, totalPrice: 4 },
    { name: 'Macadamia', price: 2, image: 'assets/images/macadamia.png', quantity: 2, totalPrice: 4 }
  ];

  // Decrease quantity and update item total price and cart total
  decrement(item: { name: string, price: number, image: string, quantity: number, totalPrice: number }): void {
    if (item.quantity > 0) {
      item.quantity--;
      item.totalPrice = item.quantity * item.price;
    }
  }

  // Increase quantity and update item total price and cart total
  increment(item: { name: string, price: number, image: string, quantity: number, totalPrice: number }): void {
    item.quantity++;
    item.totalPrice = item.quantity * item.price;
  }

  // Remove an item from the cart
  removeItem(item: { name: string, price: number, image: string, quantity: number, totalPrice: number }): void {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }

  // Calculate total price of all items in the cart
  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.totalPrice, 0);
  }
}