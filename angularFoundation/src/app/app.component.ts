import { Component } from '@angular/core';
import * as $ from 'jquery';
import { Product } from './domain/product';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor() {
    console.log('微信号是', environment.name);
  }

  test(e) {
    $('#int1').val('aaa').text('aaa');
  }

}
