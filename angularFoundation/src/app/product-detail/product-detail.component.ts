import { WebSocketService } from './../shared/web-socket.service';
// import { Observable } from 'rxjs/Observable';
import { ProductService } from './../shared/product.service';
import { Product } from './../domain/product';
import { Comment } from './../domain/comment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// tslint:disable-next-line:import-blacklist
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  isWatched = false;
  currentPrice: number;
  subscription: Subscription;
  productId: number;
  product: Product;
  comments: Observable<Comment[]>;
  ifShowCommentDiv = false;
  newComment: string;
  newRating = 0;
  averageRating: number;
  constructor(private routeInfo: ActivatedRoute, private productService: ProductService,
    private ws: WebSocketService) { }

  ngOnInit() {
    const id: number = this.routeInfo.snapshot.params['id'];
    this.productService.getProduct(id).subscribe((res) => {
      this.product = res;
      this.currentPrice = res.price;
    });
    this.comments = this.productService.getCommentsForProduct(id);
    this.productId = id;
    this.getAvg();
  }

  sendMessageToServer() {
    this.ws.sendMessage('Hello from Client');
  }

  submit(event: Event) {
    console.log('this.newRating', this.newRating);
    const comment = new Comment(5, this.productId,
      '2018-03-03 12:10:10', '张三', this.newRating, this.newComment);
    this.comments = this.productService.doInsertComment(comment);
    this.ifShowCommentDiv = !this.ifShowCommentDiv;
    this.newComment = '';
    this.newRating = 0;
    // 计算平均评价
    this.getAvg();
  }

  getAvg() {
    // const sum = this.comments.reduce((i, comment) => i + comment.rating, 0);
    // this.averageRating = sum / this.comments.length;
  }

  toggleComment() {
    this.newComment = '';
    this.newRating = 0;
    this.ifShowCommentDiv = !this.ifShowCommentDiv;
  }

  // getNewRating(newRating: number) {
  //   this.newRating = newRating;
  // }

  watchProduct($event) {
    if (this.subscription) {
      // 取消关注
      this.subscription.unsubscribe();
      this.isWatched = false;
      this.subscription = null;
    } else {
      this.isWatched = true;
      // 点击关注
      this.subscription = this.ws.createObservableSocket('ws://localhost:8080/websocket',
        this.productId)
        .subscribe(data => {
          console.log(data);
          if (!Number.isNaN(parseFloat(data))) {
            this.currentPrice = parseFloat(data);
          }
        },
        err => console.log('err', err),
        () => console.log('流已经结束'));
    }
  }

}
