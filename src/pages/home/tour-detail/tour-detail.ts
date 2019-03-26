import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { Tours } from '../../../Models/Tours';
import { DetailItemsPage } from './detail-items/detail-items';
import { ToursService } from '../../../services/Tours';
import { Review } from '../../../Models/Review';
import { CurrentUser } from '../../../services/CurrentUser';
import { AuthService } from '../../../services/auth';
import { Items } from '../../../Models/Items';


@IonicPage()
@Component({
  selector: 'page-tour-detail',
  templateUrl: 'tour-detail.html',
})
export class TourDetailPage implements OnInit {
   tour:Tours ;
   //flag=false ;
   starRating :number =0 ;
  
  constructor(private authService :AuthService ,private currentUser : CurrentUser,private tourService :ToursService ,private alertCtrl :AlertController, private events:Events ,public navCtrl: NavController, public navParams: NavParams ) {
     
    events.subscribe('star-rating:changed', (starRating) => {this.starRating=starRating ;console.log("star Rating is :"+starRating + typeof(starRating))});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TourDetailPage');
  }
  ngOnInit(){
   
    this.tour = this.navParams.data ;
   /* if (this.tour.CreatorImg!==''){
this.flag=true ;
    } */
    var  data = {
      tour_id:this.tour.uid
    }
    console.log('the tour_id' + data.tour_id) ;
    this.authService.SendData(data , 'http://192.168.1.9/Gawlah/backup/get_tour_items').then(
      res=>{
        console.log('data :'+ res.data) ;
     let dataFromServer = JSON.parse(res.data) ; 

      for(var i =0 ;i<dataFromServer.length ;i++) {
       // var   base64Data= dataFromServer[i].image;
       // var converted_image= "data:image/jpeg;base64,"+base64Data;
       // console.log('the image :'+ converted_image) ;

        this.tour.items.push(new Items('' , dataFromServer[i].name , dataFromServer[i].image , dataFromServer[i].basic_info ,
        dataFromServer[i].added_info ,dataFromServer[i].audio,dataFromServer[i].video , dataFromServer[i].sequence ,-1 , '')) ;
        console.log(this.tour.items[i].name ) ;
      }
     


      }
    )
    
   
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
  addReview(){
    const prompt = this.alertCtrl.create({
      title: 'enter a Review',
      message: "Tell us what you think",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
             console.log('data Read is :' + data.title) ;
            console.log('Saved clicked');
            this.tourService.addReviewToTour(this.tour.uid ,new Review ( this.currentUser.getUser(),'' ,data.title,this.starRating) ,this.starRating) ;
            
            console.log('Current User ' + this.currentUser.getUser()) ;
            console.log("CurrentUser from Review:" +this.tour.review[this.tour.review.length -1].user.profilePic) ;
            
           this.tour.review.forEach(
             review =>{
               console.log('forEach :' +review.content)
             }
           );
          }
        }
      ]
    });
    prompt.present();
   
  }


  

}
