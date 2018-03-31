import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit, OnChanges {
  @Input() rating: number;
  ratingArr = [];
  @Input() ifCanClick = false;
  // @Output() ratingEmitter = new EventEmitter<number>();
  @Output() ratingChange = new EventEmitter<number>();
  @Input() ifSubmit = false;
  constructor() { }

  ngOnInit() {
  }
  clickStar(index: number) {
    if (!this.ifCanClick) {
      return false;
    }
    this.rating = index + 1;
    this.ratingChange.emit(this.rating);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ratingArr = [];
    for (let i = 1; i <= 5; i++) {
      const flag = i > this.rating;
      this.ratingArr.push(flag);
    }
  }

}
