import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/products.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchModel: boolean = false;

  //pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string | null = '';
  constructor(
    private productS: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchModel = this.route.snapshot.paramMap.has('keyword');
    if (this.searchModel) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const theKeyWord: string | null =
      this.route.snapshot.paramMap.get('keyword');

    if (this.previousKeyword != theKeyWord) {
      this.thePageNumber = 1;
    }
    console.log('theKeyWord : ', theKeyWord);
    console.log('previousKeyword : ', this.previousKeyword);

    this.previousKeyword = theKeyWord;

    this.productS
      .searchProductPagination(
        this.thePageNumber - 1,
        this.thePageSize,
        theKeyWord
      )
      .subscribe(this.processResult());
  }

  handleListProducts() {
    let hasCategoryId = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = +Number(this.route.snapshot.paramMap.get('id'));
    } else {
      this.currentCategoryId = 1;
    }

    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    console.log(
      'currentCategoryId : ',
      this.currentCategoryId,
      'thePageNumber : ',
      this.thePageNumber
    );

    this.productS
      .getProductListPagination(
        this.thePageNumber - 1,
        this.thePageSize,
        this.currentCategoryId
      )
      .subscribe(this.processResult());
  }
  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }
}
