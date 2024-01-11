import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/products.service";
import {Product} from "../../common/product";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  product!: Product;

  constructor(private productService: ProductService, private route:ActivatedRoute) {
  }
 ngOnInit(){
    this.route.paramMap.subscribe(()=>{
      this.handleProductDetails();
    })
 }
  handleProductDetails(){
    const theProductId= +Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(theProductId).subscribe(
      data=>{
        this.product=data;
      }
    )


  }
}
