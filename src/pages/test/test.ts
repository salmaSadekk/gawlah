import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PusherServiceProvider } from '../../providers/push-service/push-service';
import { AuthService } from '../../services/auth';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { AudioPage } from '../tour-creation/items-add/audio/audio';
import { PreviewItemPage } from '../home/tour-detail/game-preview-items/preview-item/preview-item';

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
  
  pressed(){
  console.log('salma' ) ;
  }
  
}
