import { Category } from './../domain/category';
import { Product } from './../domain/product';
import { ProductService } from './../shared/product.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { priceValidator } from '../validators/validator';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  categories: Observable<Category[]>;
  public products: Observable<Product[]>;

  formModel: FormGroup;
  constructor(fb: FormBuilder, private productService: ProductService) {
    this.formModel = fb.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      price: ['', priceValidator],
      category: ['-1']
    });
    this.categories = productService.getAllCategories();
  }

  ngOnInit() {

  }

  onSubmit() {
    if (this.formModel.valid) {
      console.log(JSON.stringify(this.formModel.value, null, 2));
      this.productService.searchEvent.emit(this.formModel.value);
    }
  }
}
