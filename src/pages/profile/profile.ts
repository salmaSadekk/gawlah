import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CurrentUser } from '../../services/CurrentUser';
import { Tours } from '../../Models/Tours';
import { User } from '../../Models/user';
import { AuthService } from '../../services/auth';

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

 
  constructor( private currentUser:CurrentUser,private authService :AuthService,public navCtrl: NavController, public navParams: NavParams , private UserService :CurrentUser) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  
  ngOnInit() {
  const user :User= this.UserService.getUser() ;
    //this.favTours =user.favoriteTours;
   // this.ownTours =user.ownTours ;
   // this.languages =user.languages ;
    //this.score =user.score ;
    /*this.authService.SendData({profileData : 's'} , '') .then(
      res=>{
        let dataFromServer = JSON.parse(res.data) ;


      }
    ) */
    let url = this.authService.Profile_data ;
  this.authService.SendData({profile :'profile' , user_id :this.currentUser.getUser().uid} ,url ).then(
    res=>{
      console.log(res.data) ;
      console.log(res.error) ;
      console.log(res.headers) ;
      console.log(res.status) ;
      console.log(res.url) ;
      let dataFromServer = JSON.parse(res.data) ;
      this.languages = dataFromServer.data.language.split(",") ;
      this.score = dataFromServer.data.score ;
      let toursOfUser =  dataFromServer.own_tours ;
       if(toursOfUser !=undefined){
         this.hasTours = true ;
        for(var i =0 ; i< toursOfUser.length ;i++) {
          console.log(toursOfUser[i].image) ;
     
             this.ownTours.push(new Tours('' ,toursOfUser[i].tour_id  ,toursOfUser[i].theme ,toursOfUser[i].name ,
             '' ,toursOfUser[i].image,'','',[],[],toursOfUser[i].price
              )) ;
           }
       }
        
      
      
         let fav_tours =  dataFromServer.fav_tours ;
         if(fav_tours != undefined) {
           this.hasFav =true ;
          for(var i =0 ; i< fav_tours.length ;i++) {
            console.log(fav_tours[i].image) ;
       
               this.favTours.push(new Tours('' ,fav_tours[i].tour_id  ,fav_tours[i].theme ,fav_tours[i].name ,
               '' ,fav_tours[i].image,'','',[],[],fav_tours[i].price 
                )) ;
             }
         }
        
      
    }
  )
  

  }

}
