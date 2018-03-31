import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class WebSocketService {

  ws: WebSocket;
  constructor() { }

  createObservableSocket(url: string, productId: number): Observable<any> {
    this.ws = new WebSocket(`${url}/${productId}`);
    return new Observable(
      observer => {
        this.ws.onmessage = (event) => observer.next(event.data);
        this.ws.onerror = (event) => observer.error(event);
        this.ws.onclose = (event) => observer.complete();
        return () => this.ws.close();
      }
    );
  }

  sendMessage(message: string) {
    this.ws.send(message);
  }

  closeWs() {
    this.ws.close();
  }
}
