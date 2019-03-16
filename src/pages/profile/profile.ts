import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CurrentUser } from '../../services/CurrentUser';
import { Tours } from '../../Models/Tours';
import { User } from '../../Models/user';

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
export class ProfilePage implements OnInit {
 favTours :Tours[] =[] ;
 ownTours:Tours[] =[] ;
 languages :string[] =[] ;
 score:number = 0 ;
  constructor(public navCtrl: NavController, public navParams: NavParams , private UserService :CurrentUser) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  
  ngOnInit() {
    const user :User= this.UserService.getUser() ;
    this.favTours =user.favoriteTours;
    this.ownTours =user.ownTours ;
    this.languages =user.languages ;
    this.score =user.score ;

  }

}
