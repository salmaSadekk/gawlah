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
    this.sort() ;
   this.navCtrl.push(DetailItemsPage ,{'items':this.tour.items , 'index':0  }) ;
  }
  sort() {
    
    let arr =this.tour.items ;
    arr.forEach(item=>{
      console.log("item :" +item.name +"sequence Number :"+item.sequenceNum +"Parent Num"+item.parentnum) ;
    })
    let n =arr.length ;
    for(var i=1 ;i<n ;++i){
     let key = arr[i]; 
     
    var j = i - 1; 
 
    
        while (j >= 0 && arr[j].sequenceNum > key.sequenceNum) { 
         arr[j + 1] = arr[j]; 
         j = j - 1; 
     } 
     arr[j + 1] = key;
    }
    arr.forEach(item=>{
      console.log(" after sorting :item :" +item.name +"sequence Number :"+item.sequenceNum +"Parent Num"+item.parentnum) ;
    })
    for(var x =1 ;x<n ;x++){
      if(arr[x].sequenceNum ==arr[x-1].sequenceNum){
        arr[x].parentnum=arr[x-1].parentnum ;
      }
      else{
       arr[x].parentnum=x-1 ;
      }
    }
    arr.forEach(item=>{
      console.log("after sorting parents item :" +item.name +"sequence Number :"+item.sequenceNum +"Parent Num"+item.parentnum) ;
    })
  }

}
