import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Tours } from '../../Models/Tours';
import { ItemsAddPage } from './items-add/items-add';

/**
 * Generated class for the TourCreationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tour-creation',
  templateUrl: 'tour-creation.html',
})
export class TourCreationPage {
  tour :Tours = new Tours('','','','','','',[],[]) ;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TourCreationPage');
  }
  onSubmit(f :NgForm) {
    let name = f.value.name ;
  this.tour.name= f.value.name ;
  this.tour.theme = f.value.theme ;
  this.tour.duration =f.value.dur;
 
   this.navCtrl.push(ItemsAddPage , {'tour':this.tour ,'index':0}) ;
  }

}
