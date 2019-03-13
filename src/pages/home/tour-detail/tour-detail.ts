import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Tours } from '../../../Models/Tours';
import { DetailItemsPage } from './detail-items/detail-items';


@IonicPage()
@Component({
  selector: 'page-tour-detail',
  templateUrl: 'tour-detail.html',
})
export class TourDetailPage implements OnInit {
   tour:Tours ;
   flag=false ;
  constructor(public navCtrl: NavController, public navParams: NavParams ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TourDetailPage');
  }
  ngOnInit(){
    this.tour = this.navParams.data ;
    if (this.tour.CreatorImg!==''){
this.flag=true ;
    }
   
  }
  onItemClick(){
   this.navCtrl.push(DetailItemsPage ,{'items':this.tour.items , 'index':0 }) ;
  }

}
