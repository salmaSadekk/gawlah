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
  lottieConfig  :Object ;
  lottieConfig2  :Object ;
  first =true ;
  private anim: any;
 constructor(){
  this.lottieConfig = {
    path: 'assets/animations/trophy.json',
    renderer: 'canvas',
    autoplay: true,
    loop: true
};
this.lottieConfig2 = {
  path: 'assets/animations/coins.json',
  renderer: 'canvas',
  autoplay: true,
  loop: true
};
 }
 handleAnimation(anim: any) {
  this.anim = anim;
  }
}
