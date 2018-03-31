import { Category } from './../domain/category';
import { Injectable, EventEmitter } from '@angular/core';
import { Product } from '../domain/product';
import { Comment } from '../domain/comment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { ProductSearchParams } from '../domain/productSearchParams';

@Injectable()
export class ProductService {

  // private products: Product[] = [
  //   new Product(1, '第一个商品', 1.99, 3.5, '这是第一个商品，是我在学习慕课网Angular入门实战时创建的', ['0', '1']),
  //   new Product(2, '第二个商品', 2.99, 2.5, '这是第二个商品，是我在学习慕课网Angular入门实战时创建的', ['0', '1']),
  //   new Product(3, '第三个商品', 3.99, 1.5, '这是第三个商品，是我在学习慕课网Angular入门实战时创建的', ['0', '1']),
  //   new Product(4, '第四个商品', 12, 0.5, '这是第四个商品，是我在学习慕课网Angular入门实战时创建的', ['0', '1']),
  //   new Product(5, '第五个商品', 6, 5, '这是第五个商品，是我在学习慕课网Angular入门实战时创建的', ['0', '1']),
  //   new Product(6, '第六个商品', 2, 3, '这是第六个商品，是我在学习慕课网Angular入门实战时创建的', ['0', '1']),
  //   new Product(7, '第七个商品', 4, 2, '这是第七个商品，是我在学习慕课网Angular入门实战时创建的', ['0', '1']),
  // ];

  // private comments: Comment[] = [
  //   new Comment(1, 1, '2017-02-02 22:22:22', '张三', 3, '东西不错'),
  //   new Comment(2, 1, '2017-03-03 23:22:22', '李四', 4, '东西是不错'),
  //   new Comment(3, 1, '2017-04-04 21:22:22', '王五', 2, '东西挺不错'),
  //   new Comment(4, 2, '2017-05-05 20:22:22', '赵六', 4, '东西还不错')
  // ];

  searchEvent = new EventEmitter<ProductSearchParams>();

  constructor(private http: HttpClient) { }
  getAllCategories(): Observable<Category[]> {
    return this.http.get('/api/categories') as Observable<Category[]>;
  }

  getProducts(): Observable<Product[]> {
    return this.http.get('/api/products/all') as Observable<Product[]>;
  }
  getProduct(id): Observable<Product> {
    // 路由里面传参数即使是数字，传过来之后会变成字符串，这里转一下
    const _id = +id;
    return this.http.get(`/api/products/id/${_id}`) as Observable<Product>;
  }

  getProductsByTitle(title: string): Observable<Product[]> {
    return this.http.get(`/api/products/title/${title}`) as Observable<Product[]>;
  }

  getProductsByPrice(price: number): Observable<Product[]> {
    return this.http.get(`/api/products/price/${price}`) as Observable<Product[]>;
  }

  getProductsByCategory(category: number): Observable<Product[]> {
    return this.http.get(`/api/products/category/${category}`) as Observable<Product[]>;
  }

  getProductsBySearch(product: ProductSearchParams): Observable<Product[]> {
    const headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    return this.http.post(`/api/products/search`, product,
      { headers: headers }) as Observable<Product[]>;
  }

  getCommentsForProduct(productId: number): Observable<Comment[]> {
    return this.http.get(`/api/comments/${productId}`) as Observable<Comment[]>;
  }

  doInsertComment(comment: Comment): Observable<Comment[]> {
    const headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    return this.http.post(`/api/comment`, comment,
      { headers: headers }) as Observable<Comment[]>;
  }
}
