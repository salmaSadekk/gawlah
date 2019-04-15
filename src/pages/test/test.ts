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
  showCard="false" ;
  constructor(private modalCtrl :ModalController) {

  }
  ShowQuestions() {
    console.log("yala") ;
     const modal = this.modalCtrl.create(PreviewItemPage) ;
     modal.present() ;

  }
  /*
  constructor(private payPal: PayPal) { }

payment: PayPalPayment = new PayPalPayment('10.10', 'USD', 'TV', 'sale');
currencies = ['EUR', 'USD']
Payment() {
  this.payPal.init({
    PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
    PayPalEnvironmentSandbox: 'YOUR_SANDBOX_CLIENT_ID'
  }).then(() => {
    // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
    this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
      // Only needed if you get an "Internal Service Error" after PayPal login!
      //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
    })).then(() => {
      let payment = new PayPalPayment('3.33', 'USD', 'Description', 'sale');
      this.payPal.renderSinglePaymentUI(payment).then(() => {
        // Successfully paid
  
        // Example sandbox response
        //
        // {
        //   "client": {
        //     "environment": "sandbox",
        //     "product_name": "PayPal iOS SDK",
        //     "paypal_sdk_version": "2.16.0",
        //     "platform": "iOS"
        //   },
        //   "response_type": "payment",
        //   "response": {
        //     "id": "PAY-1AB23456CD789012EF34GHIJ",
        //     "state": "approved",
        //     "create_time": "2016-10-03T13:33:33Z",
        //     "intent": "sale"
        //   }
        // }
      }, () => {
        // Error or render dialog closed without being successful
      });
    }, () => {
      // Error in configuration
    });
  }, () => {
    // Error in initialization, maybe PayPal isn't supported or something else
  });
} */
}
