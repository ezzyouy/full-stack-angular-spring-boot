import {Component, OnInit} from '@angular/core';
import {ProductCategory} from "../../common/product-category";
import {ProductService} from "../../services/products.service";

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css'
})
export class ProductCategoryMenuComponent implements OnInit{
  productCatgory!:ProductCategory[];

  constructor(private productService:ProductService) {
  }

  ngOnInit() {
    this.listProductCategories();
  }

  listProductCategories(){
    this.productService.getProductCatgories().subscribe(data=>{
      this.productCatgory=data
    })
  }
}
