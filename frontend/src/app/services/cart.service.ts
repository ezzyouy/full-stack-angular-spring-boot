import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  //storage: Storage = sessionStorage;
  storage: Storage = localStorage;
  constructor() {
    let data = JSON.parse(this.storage.getItem('cartItems')!);

    if (data != null) {
      this.cartItems = data;
    }
    this.computeCartToTals();
  }

  addToCart(theCartItem: CartItem) {
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;

    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find(
        (tempCartItem) => tempCartItem.id === theCartItem.id
      );
      alreadyExistsInCart = existingCartItem != undefined;
    }
    if (alreadyExistsInCart) {
      existingCartItem!.quantity++;
    } else {
      this.cartItems.push(theCartItem);
    }

    this.computeCartToTals();
  }
  computeCartToTals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;

      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);

    this.persistCartItems();
  }
  persistCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Content og the cart');
    for (let tempCartItems of this.cartItems) {
      const subTotalPrice = tempCartItems.quantity * tempCartItems.unitPrice;

      console.log(
        `name : ${tempCartItems.name}, quantity : ${tempCartItems.quantity}, unitPrice : ${tempCartItems.unitPrice}`
      );
    }
    console.log(
      `totalPrice : ${totalPriceValue.toFixed(
        2
      )}, totalPrice : ${totalQuantityValue}`
    );
    console.log('--------');
  }
  decrementQuantity(tempCartItem: CartItem) {
    tempCartItem.quantity--;
    if (tempCartItem.quantity === 0) {
      this.remove(tempCartItem);
    } else {
      this.computeCartToTals();
    }
  }
  remove(theCartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(
      (tempCart) => tempCart.id === theCartItem.id
    );
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartToTals();
    }
  }
}
