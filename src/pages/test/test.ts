import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PusherServiceProvider } from '../../providers/push-service/push-service';
import { AuthService } from '../../services/auth';

/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage{
  comments = [];
      message: string;
      url: string = 'http://localhost:4000/message'
      rating = {
        bad : 0,
        good : 0,
      }
      constructor(private authservice :AuthService ,public navCtrl: NavController, private pusher : PusherServiceProvider
        ) {}

      sendComment(){
        if(this.message != ''){
          this.authservice.SendData(this.url, {message : this.message}).then((res : any) => {
            this.message = '';
          })
        }
      }


  ionViewDidLoad(){
   const channel = this.pusher.init();
      channel.bind('message', (data) => {
        if(data.score >= 1){
          this.rating.good = this.rating.good + 1;
        }
        else{
          this.rating.bad = this.rating.bad + 1;
        }
        this.comments.push(data);
      });
  }
}
