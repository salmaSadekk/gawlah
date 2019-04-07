import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';

/*
  Generated class for the PushServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
declare const Pusher: any;
@Injectable()
export class PusherServiceProvider {
  channel;
  constructor(public http: HttpClient) {
  var pusher = new Pusher("PUSHER_KEY", { 
  cluster: 'eu',
  encrypted: true,
  });
  this.channel = pusher.subscribe('comments');
}

  public init(){
   return this.channel;
  }
}
