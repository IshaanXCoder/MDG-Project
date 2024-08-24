import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './bill.page.html',
  styleUrls: ['./bill.page.scss'],
})
export class BillPage {

  cartItems = [
    { name: 'Watermelon', price: 2, image: 'assets/images/watermelon.png', quantity: 2 },
    { name: 'Tomato', price: 2, image: 'assets/images/tomato.png', quantity: 2 },
    { name: 'Cucumber', price: 2, image: 'assets/images/cucumber.png', quantity: 2 },
    { name: 'Spinach', price: 2, image: 'assets/images/spinach.png', quantity: 2 },
    { name: 'Macadamia', price: 2, image: 'assets/images/macadamia.png', quantity: 2 }
  ];

  // Decrease item quantity, but not below zero
  decrement(item: { name: string, price: number, image: string, quantity: number }): void {
    if (item.quantity > 0) {
      item.quantity--;
    }
  }

  // Increase item quantity
  increment(item: { name: string, price: number, image: string, quantity: number }): void {
    item.quantity++;
  }

  // Remove the item from the cart
  removeItem(item: { name: string, price: number, image: string, quantity: number }): void {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }

  // Calculate the total price of items in the cart
  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}