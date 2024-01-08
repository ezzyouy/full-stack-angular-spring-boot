import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/products.service";
import {Product} from "../../common/product";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number=1;
  constructor(private productS: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts()
    })
  }

  listProducts() {
    let hasCategoryId = this.route.snapshot.paramMap.has("id");
    if (hasCategoryId) {
      this.currentCategoryId = + Number(this.route.snapshot.paramMap.get("id"));
    } else {
      this.currentCategoryId = 1;
    }
    this.productS.getProductList(this.currentCategoryId).subscribe(data => {
      this.products = data
      console.log(data)
    })
  }
}
