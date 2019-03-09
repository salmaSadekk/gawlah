import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
   user :boolean =true;
   tours:boolean =false;
   favorites:boolean=false ;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  flag(flag :string){
  switch(flag) {
    case 'User' :this.user=true ; this.tours=false;this.favorites=false;break;
    case 'Fav' :this.user=false ; this.tours=false;this.favorites=true;break;
    case 'Tour' :this.user=false; this.tours=true;this.favorites=false;break;
  }
  }

}
