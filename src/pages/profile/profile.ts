import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CurrentUser } from '../../services/CurrentUser';
import { Tours } from '../../Models/Tours';
import { User } from '../../Models/user';
import { AuthService } from '../../services/auth';
import { TourDetailPage } from '../home/tour-detail/tour-detail';
import { EditTourPage } from '../edit-tour/edit-tour';
import { FollowPage } from './follow/follow';


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
hasFav = false ;
hasTours = false ;
img = '' ;
name = '' ;
Profile_uid ='' ;
user = '' ;
followed =false ;
followed_id = '' ;

 
  constructor( private currentUser:CurrentUser,private authService :AuthService,public navCtrl: NavController, public navParams: NavParams , private UserService :CurrentUser
    , private alertCtrl :AlertController) {
  
  }
  gotoTour(tour){
    this.navCtrl.push(TourDetailPage ,tour) ;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  
  ngOnInit() {
  this.user = this.UserService.getUser().uid ; 
  console.log('from service ' +this.UserService.getUser().uid) ;
  console.log('from user ' + this.user) ;
  
  
  console.log("user from profilr" + this.user) ;
  
    let url = this.authService.Profile_data ;
    
    if(this.navParams.get('user_id')!= undefined) {
    this.user = this.navParams.get('user_id') ;
    }
  this.authService.SendData({profile :'profile' , user_id :this.user , current_user : this.UserService.getUser().uid} ,url ).then(
    res=>{
      console.log(res.data) ;
      console.log(res.error) ;
      console.log(res.headers) ;
      console.log(res.status) ;
      console.log(res.url) ;
      let dataFromServer = JSON.parse(res.data) ;
      this.languages = dataFromServer.data.language.split(",") ;
      this.score = dataFromServer.data.score ;
      this.img = dataFromServer.data.ProfileImg ;
      this.name =dataFromServer.data.name ;
      this.followed = dataFromServer.data.followed ;
      this.followed_id = dataFromServer.data.followed_id ;
      

      
      let toursOfUser =  dataFromServer.own_tours ;
       if(toursOfUser !=undefined){
         this.hasTours = true ;
        for(var i =0 ; i< toursOfUser.length ;i++) {
          console.log(toursOfUser[i].image) ;
     
             this.ownTours.push(new Tours(toursOfUser[i].name ,toursOfUser[i].tour_id  ,toursOfUser[i].theme ,toursOfUser[i].museum,
             dataFromServer.data.ProfileImg ,toursOfUser[i].image,'',toursOfUser[i].rating,[],[],toursOfUser[i].price ,toursOfUser[i].tour_info ,
             toursOfUser[i].creator_id
              )) ;
           }
       }
        
      
      
         let fav_tours =  dataFromServer.fav_tours ;
         if(fav_tours != undefined) {
           this.hasFav =true ;
           console.log("favvv" + res.data) ;
          for(var i =0 ; i< fav_tours.length ;i++) {
            console.log(fav_tours[i].image) ;
       
               this.favTours.push(new Tours(fav_tours[i].name ,fav_tours[i].tour_id  ,fav_tours[i].theme ,fav_tours[i].museum,
                fav_tours[i].creator ,fav_tours[i].image,'',fav_tours[i].rating,[],[],fav_tours[i].price ,fav_tours[i].tour_info ,
                fav_tours[i].creator_id
              )) ;
             }
         }
        
      
    }
  )
  

  }
  edit(tour:Tours){
   this.navCtrl.push(EditTourPage , {tour:tour}) ;
  }
  ondelete(i , uid) {
    const confirm = this.alertCtrl.create({
      title: 'delete the Tour',
      message: 'Are you sure you want to delete the tour',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Canceled clicked');
          }
        } ,
        {
          text: 'Yes',
          handler: () => {
           
            let url = this.authService.deleteTour ;
            this.authService.SendData({tour_id:uid} , url) .then(
              res=>{
                console.log(res.error) ;
                console.log(res.status) ;
                console.log(res.data) ;
                this.ownTours.splice(i ,1) ;
              }
            )
          }
        }
        
      ]
    });
    confirm.present();
  }
  followButton() {
    let url = this.authService.follow_user ;
    
  this.authService.SendData({follow :'yes', follower_id : this.currentUser.getUser().uid , following_id :this.Profile_uid} ,url ).then(
    res=>{
      let alert = this.alertCtrl.create({
    
        title:'Follow',
        subTitle:'User added to your following list',
        buttons: ['OK']
        
        });
        
        alert.present(); 
    }
  )
  } 
  unfollowButton() {
    let url = this.authService.follow_user ;
    
    this.authService.SendData({unfollow :'yes', follow_id : this.followed_id} ,url ).then(
      res=>{
        let alert = this.alertCtrl.create({
      
          title:'unFollow',
          subTitle:'User removed from your following list',
          buttons: ['OK']
          
          });
          
          alert.present(); 
      }
    )
  }
  getfollowers() {
   this.navCtrl.push(FollowPage , {
     type : 'followers' ,
     user_id :this.user
   })
  

  } 
  getfollowing(){
    this.navCtrl.push(FollowPage , {
      type : 'following' ,
      user_id :this.user
    })
  }
   
  }


