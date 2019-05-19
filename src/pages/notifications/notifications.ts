import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Notif } from '../../services/notif';
import { User } from '../../Models/user';
import { AuthService } from '../../services/auth';
import { CurrentUser } from '../../services/CurrentUser';
import { Notification } from '../../Models/Notification';
import { ProfilePage } from '../profile/profile';
import { TourDetailPage } from '../home/tour-detail/tour-detail';
import { Tours } from '../../Models/Tours';
import { t } from '@angular/core/src/render3';

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
notifications:Notification[]=[] ;

  constructor( private currentUser : CurrentUser,private authService :AuthService ,private notif : Notif,public navCtrl: NavController, public navParams: NavParams) {
   
  }
  ionViewWillEnter() {
    this.notifications =[] ;
    let url = this.authService.get_notif ;
    this.authService.SendData( {
get_Notif :"true" ,
user_id : this.currentUser.getUser().uid
    } , url).then(
      res=>
      {
        console.log(res.data) ;
        console.log(res.error) ;
        console.log(res.headers) ;
        console.log(res.status) ;
        console.log(res.url) ;
        let dataFromServer = JSON.parse(res.data) ;
        for(var i =0 ; i< dataFromServer.length ;i++) {
        this.notifications.push(new Notification(dataFromServer[i].notif_id , dataFromServer[i].type ,
          new User(dataFromServer[i].Notifier_id , dataFromServer[i].Notifier_name ,dataFromServer[i].Notifier_img) , dataFromServer[i].tour_id , dataFromServer[i].game_id , dataFromServer[i].Notification))
           
           }

      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }
  showProfile(user) {
    this.navCtrl.push(ProfilePage , {user_id : user.uid}) ;
  }
  navigate(notif){
    var  data ;
    var tour ;
      if(notif.type== "follow" )  this.navCtrl.push(ProfilePage , {user_id : notif.user.uid})   
    else  if(notif.type== "favorite") {
        data ={
          tour_id: notif.tour_id
        }
        console.log("fav"+ notif.tour_id) ;
 this.data(data ,{item:tour}) ;
     
      
      } 
      else if(notif.type==  "review")   {
        if(notif.game_id != null && notif.game_id !=undefined) {
           data = {
            game_id: notif.game_id
          } 
          console.log("rev"+ notif.tour_id) ;
         this.data(data,{Game:true ,item:tour} ) ;
          
         

        }else{
          data = {
            tour_id: notif.tour_id
          } 
          console.log("fav"+ notif.tour_id) ;
       this.data(data ,{item:tour}) ;
         
        }}
  }
data(data , para) {
  let url = this.authService.get_Tour;
 // console.log("testtt" + notif.tour_id)
  this.authService.SendData(data, url).then(
    res=>{
      console.log(res.data) ;
  console.log(res.error) ;
  console.log(res.headers) ;
  console.log(res.status) ;
  console.log(res.url) ;
     var tour ;
      let dataFromServer = JSON.parse(res.data) ;
      for(var i =0 ; i< dataFromServer.length ;i++) {
        console.log(dataFromServer[i].rating) ;
   
        tour =new Tours(dataFromServer[i].name ,dataFromServer[i].tour_id  ,dataFromServer[i].theme , dataFromServer[i].museum ,
         dataFromServer[i].creator,dataFromServer[i].image,'',dataFromServer[i].rating,[],[],dataFromServer[i].price ,
          dataFromServer[i].tour_info , dataFromServer[i].creator_id
          ) ;
         }
         para.item = tour ;
         this.navCtrl.push(TourDetailPage ,para)
      

    } 
   
  );
}

}
