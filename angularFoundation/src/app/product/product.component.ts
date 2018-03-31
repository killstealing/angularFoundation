import { Observable } from 'rxjs/Observable';
import { ProductService } from './../shared/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../domain/product';
import { FormControl } from '@angular/forms';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private products1: Array<Product>;
  private products: Observable<Product[]>;
  search: FormControl = new FormControl();
  keyWord: string;

  constructor(private service: ProductService) {
    this.search.valueChanges
      .debounceTime(500)
      .subscribe(title => {
        console.log(title);
        this.keyWord = title;
        this.products = this.service.getProductsByTitle(title);
      });
  }

  ngOnInit() {
    this.products = this.service.getProducts();
    this.service.searchEvent.subscribe(res => {
      this.products = this.service.getProductsBySearch(res);
    });
  }
}
