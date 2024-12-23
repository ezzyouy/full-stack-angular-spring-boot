import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/products.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }
  handleProductDetails() {
    const theProductId = +Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(theProductId).subscribe((data) => {
      this.product = data;
    });
  }
  addToCart() {
    console.log(
      `Adding to cart : ${this.product.name}, ${this.product.unitPrice}`
    );

    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }
}
