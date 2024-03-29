import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController, Tabs, PopoverController } from 'ionic-angular';
import { Tours } from '../../../Models/Tours';
import { DetailItemsPage } from './detail-items/detail-items';
import { ToursService } from '../../../services/Tours';
import { Review } from '../../../Models/Review';
import { CurrentUser } from '../../../services/CurrentUser';
import { AuthService } from '../../../services/auth';
import { Items } from '../../../Models/Items';
import { SearchService } from '../../../services/search';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { User } from '../../../Models/user';
import { ProfilePage } from '../../profile/profile';
import { game_Items } from '../../../Models/game_items';
import { GamePreviewItemsPage } from './game-preview-items/game-preview-items';
import { SearchPage } from '../../search/search';
import { reviewdetail } from './popover';
import { TabsPage } from '../../tabs/tabs';


@IonicPage()
@Component({
  selector: 'page-tour-detail',
  templateUrl: 'tour-detail.html',
})
export class TourDetailPage implements OnInit {
   tour:Tours ;
   //flag=false ;
   Game=false ;
   starRating :number =0 ;
   lottieConfig  :Object ;
   private anim: any;
   handleAnimation(anim: any) {
    this.anim = anim;
    }
  
  constructor(private popoverCtrl: PopoverController,private searchSer:SearchService,private authService :AuthService ,private currentUser : CurrentUser,private tourService :ToursService ,private alertCtrl :AlertController, private events:Events ,public navCtrl: NavController, public navParams: NavParams ) {
    this.lottieConfig = {
      path: 'assets/animations/coins2.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
  };
    events.subscribe('star-rating:changed', (starRating) => {this.starRating=starRating ;console.log("star Rating is :"+starRating + typeof(starRating))});
  }
  SearchTheme(theme){
    /*
    var t: Tabs = this.navCtrl.parent;
 this.searchSer.item =theme ;
 t.select(1); */
 this.searchSer.item =theme ;
 this.navCtrl.push(SearchPage) ;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TourDetailPage');
  }
  ngOnInit(){
    console.log("salmaaaaaaaaaaaaa") ;
  
    var  data  ;
    if( this.navParams.data.Game!== undefined && this.navParams.data.Game ==true ){
      this.Game = true ;
      if(this.navParams.get('TourDisplay')==undefined ) {
       
        this.tour = this.navParams.data.item ;
       console.log("a test to check it"+ JSON.stringify(this.tour)) ;
      } else{
        this.tour =this.navParams.get('TourDisplay') ;
        console.log("testFromGames" +JSON.stringify(this.tour)) ;
      }
       console.log(JSON.stringify(this.tour))
           data = {
           game_id:this.tour.uid
         }
         let url = this.authService.get_game_questions ;
         this.authService.SendData(data ,url).then(
           res=>{
             console.log(res.error) ;
             console.log(res.headers)
             console.log(res.status)
             console.log(res.url)
             console.log('data :'+ res.data) ;
          let dataFromServer = JSON.parse(res.data) ; 
         var questions : game_Items []=[] ;
           for(var i =0 ;i<dataFromServer.length ;i++) {
         questions.push(new game_Items(dataFromServer[i].name,dataFromServer[i].image,'' ,dataFromServer[i].question , dataFromServer[i].choices ,
              dataFromServer[i].correct_answer , dataFromServer[i].did_you_know , dataFromServer[i].question_id )) ;
           }
           if(questions.length>0){
                var item =questions.splice(0 ,1) ;
           console.log('the length' + questions.length) ;
           this.tour.items.push({name:item[0].name , arr :[item]}) ;
           console.log("www" +JSON.stringify(this.tour.items[0]))
          for(var i =0 ;i<questions.length;){
            var itemval =questions.splice(i,1) ;
            var val =this.tour.items.findIndex(
              item=>{
                
                return item.name ==itemval[0].name
              }
            )
            if(val ==-1){
           
              var x = this.tour.items.push({name:itemval[0].name , arr :[itemval]}) ;
              console.log('val=-1 ::' + x) ;
             }
             else{
              
               this.tour.items[val].arr.push(itemval) ;
              
             }
          }
          
         
        
             
           } 
          });
        
   
     
      

    }
    else{
      console.log(this.Game) ;
      console.log(JSON.stringify(this.tour))
      if(this.navParams.get('TourDisplay')==undefined ) {
        this.tour = this.navParams.data.item ;
        data = {
          tour_id:this.tour.uid
        }
        let url = this.authService.get_tour_items ;
        this.authService.SendData(data ,url).then(
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
         // console.log(this.tour.items[0].name ) ;
        
    
          }
        )
       } else{
         this.tour = this.navParams.get('TourDisplay') ;
       }
    
    /* if (this.tour.CreatorImg!==''){
 this.flag=true ;
     } */
    
    }
    let url = this.authService.get_Reviews ;
    var data ;
    if(this.Game==true){
      data ={getReviews:'true' , game_id : this.tour.uid }
    }else{
      data ={getReviews:'true' , tour_id : this.tour.uid }
    }
    this.authService.SendData(data, url).then(
      res=>{console.log(res.data) ;
        console.log(res.error) ;
        console.log(res.headers) ;
        console.log(res.status) ;
        console.log(res.url);
        let dataFromServer = JSON.parse(res.data) ;
        for(var i=0 ;i<dataFromServer.length ; i++) {
          this.tour.review.push(new Review (new User(dataFromServer[i].creator_id , dataFromServer[i].creator_name , dataFromServer[i].creator_image) ,'' , dataFromServer[i].review , dataFromServer[i].rating , dataFromServer[i].review_id)) ;
        }
      }
    ) ;
   
  }
  onItemClick(){
    if(this.Game) {
      console.log("testFFF" +JSON.stringify(this.tour.items))
      if(this.tour.items.length>0)
     this.navCtrl.push(GamePreviewItemsPage , {'items':this.tour.items}) ;
    }else{
      this.sort() ;
      if(this.tour.items.length>0)
      this.navCtrl.push(DetailItemsPage ,{'items':this.tour.items , 'index':0  }) ;
    }
    
  }
  reviewdetail(review:Review){
    const popover = this.popoverCtrl.create(reviewdetail , {rev :review});
    popover.present({ev:event  });
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
            if(this.Game==true){
              let url = this.authService.set_Review ;
              this.authService.SendData( {user_id :this.currentUser.getUser().uid ,username :this.currentUser.getUser().name  , game_id: this.tour.uid, tourname: this.tour.TourName,creator_id:this.tour.creator_id , review :data.title ,rating : this.starRating} ,url) .then(
                res=>{
                  let url = this.authService.extra ;
                  this.authService.SendData( {
                    get_Rate:true ,
                    game_id: this.tour.uid
                  },url) .then(
                    res=>{
                      let dataFromServer = JSON.parse(res.data) ;
                      this.tour.Rating= dataFromServer.rating ;
                    }
                  );
                }
              );
            }else{
              let url = this.authService.set_Review ;
              this.authService.SendData( {user_id :this.currentUser.getUser().uid ,username :this.currentUser.getUser().name  , tour_id: this.tour.uid, tourname: this.tour.TourName,creator_id:this.tour.creator_id , review :data.title ,rating : this.starRating} ,url) .then(
                res=>{
                  let url = this.authService.extra ;
                  this.authService.SendData( {
                    get_Rate:true ,
                    tour_id: this.tour.uid
                  },url) .then(
                    res=>{
                      let dataFromServer = JSON.parse(res.data) ;
                      this.tour.Rating= dataFromServer.rating ;
                    }
                  );
                }
              );
            }
         
          } 
        }
      ]
    });
    prompt.present();
   
  }
  Back(){
    this.navCtrl.setRoot(TabsPage)
  }
  doInfinite(e): Promise<any> {
   var data ;
    if(this.Game==true) {
      if(this.tour.review.length==0) {
        data ={getReviews:'true' , game_id : this.tour.uid }
      }else
       data ={
        getReviews:'true' , game_id : this.tour.uid  ,
        last_Review_id : this.tour.review[this.tour.review.length -1].review_id
       }
    } else{
      if(this.tour.review.length==0) {
        data ={getReviews:'true' , tour_id : this.tour.uid }
      }else
      data ={
        getReviews:'true' , tour_id : this.tour.uid  ,
        last_Review_id : this.tour.review[this.tour.review.length -1].review_id
       }
    }
   
     let url = this.authService.get_Reviews;
       return this.authService.SendData( data ,url ).then(result => {
       
        let dataFromServer = JSON.parse(result.data) ;
        for(var i=0 ;i<dataFromServer.length ; i++) {
          this.tour.review.push(new Review (new User(dataFromServer[i].creator_id , dataFromServer[i].creator_name , dataFromServer[i].creator_image) ,'' , dataFromServer[i].review , dataFromServer[i].rating ,dataFromServer[i].review_id )) ;
        }
            // this.tours =  this.toursService.getTours() ;
            
    }) } 

    showProfile(user) {
      this.navCtrl.push(ProfilePage , {user_id : user.uid}) ;
    }
  

}
