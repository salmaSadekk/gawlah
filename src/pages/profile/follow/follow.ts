import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../../services/auth';
import { User } from '../../../Models/user';
import { ProfilePage } from '../profile';

/**
 * Generated class for the FollowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-follow',
  templateUrl: 'follow.html',
})
export class FollowPage implements OnInit {
   user_id = ''; 
   users:User[] =[] ;
   type = '' ;
   
  constructor(private authService :AuthService,public navCtrl: NavController, public navParams: NavParams) {
  }
 
  ngOnInit(){
    this.user_id = this.navParams.get('user_id') ;
    this.type = this.navParams.get('type') ;
    if(this.type=='following') {
      let url = this.authService.get_followers_following ;
    this.authService.SendData({following:'t' , user_id:this.user_id} ,url).then(
      res=>{
        console.log(res.data) ;
        console.log(res.error) ;
        console.log(res.headers) ;
        console.log(res.status) ;
        console.log(res.url) ; 
       let dataFromServer = JSON.parse(res.data) ;
       for(var i=0 ; i<dataFromServer.length ;i ++ ) {
         this.users.push(new User(dataFromServer[i].id , dataFromServer[i].name , dataFromServer[i].ProfileImage)) ;
       }
 
      }
    )
    } else 
    if(this.type=='followers') {
      let url = this.authService.get_followers_following ;
    this.authService.SendData({followers:'t' , user_id:this.user_id} ,url).then(
      res=>{
        console.log(res.data) ;
        console.log(res.error) ;
        console.log(res.headers) ;
        console.log(res.status) ;
        console.log(res.url) ; 
       let dataFromServer = JSON.parse(res.data) ;
       for(var i=0 ; i<dataFromServer.length ;i ++ ) {
         this.users.push(new User(dataFromServer[i].id , dataFromServer[i].name , dataFromServer[i].ProfileImage)) ;
       }
 
      }
    )
    }
    
  }
  showProfile(user) {
    this.navCtrl.push(ProfilePage , {user_id : user.uid}) ;
  }

}
