import * as Stomp from 'stompjs'
import * as SockJS from 'sockjs-client'
import { AppComponent } from './app.component'

export class WebSocketAPI {
  // こっちでもいけるのか・・・？
  // webSocketEndPoint: string = 'http://localhost:5001/ws';
  webSocketEndPoint = 'ws://localhost:5001';
  topic = "/topic/greetings";
  stompClient: any;
  appComponent: AppComponent;
  constructor(appComponent: AppComponent) {
    this.appComponent = appComponent
  }

  _connect() {
    console.log("Initialize WebSocket Connection");
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame) {
      _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
        _this.onMessageReceived(sdkEvent)
      })
    })
  }
}
