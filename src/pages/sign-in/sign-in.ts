import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import {Http, Headers, RequestOptions}  from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthService } from '../../services/auth';
import { SignUpPage } from '../sign-up/sign-up';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { CurrentUser } from '../../services/CurrentUser';
import { User } from '../../Models/user';
import { Storage } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

 
  constructor(private oneSignal :OneSignal,private storage : Storage ,private currentUser :CurrentUser,public navCtrl: NavController, public navParams: NavParams ,private loading :LoadingController,
    private authService :AuthService, private alertCtrl:AlertController ,public toastCtrl: ToastController) {
   
  }
  SignUp(){
    this.navCtrl.push(SignUpPage) ;
  }

  onSubmit(f:NgForm){
    
    
    
    let loader = this.loading.create({
    
    content: 'Please wait a moment',
    
    });
    
    loader.present() ;
    var data = {
      username : f.value.email,
      password: f.value.password ,
      login:'s' 
    } ;
      
    
    console.log('JSON error detected in signIn') ;
    this.authService.signIn(data
     )
    .then(res => {
      console.log("data error:" +res.data) ;
      let dataFromServer = JSON.parse(res.data) ;
      console.log('from signIn :'+ dataFromServer ) ;
      this.currentUser.setUser( new User(dataFromServer.user_id , dataFromServer.username , dataFromServer.profileImg) ) ;
      this.storage.set('uid' , dataFromServer.user_id ).then().catch(
        error=>{
          console.log( "an error occured while storing uid" + error) ;
        }
      ) ;
      this.storage.set('name' , dataFromServer.username) ;
      this.storage.set('profileImg' , dataFromServer.profileImg) ;
      this.oneSignal.startInit('e2d3c118-911c-4403-851d-4ae46680b74f', '122286071455');
      this.oneSignal.sendTag("user_id",dataFromServer.user_id) ;
      
      this.oneSignal.endInit();
    
   
    loader.dismiss() ; 
   
  console.log(res.error) ;
   
    if(!dataFromServer.error){
    
    let alert = this.alertCtrl.create({
    
    title:'SignIn successful',
    subTitle:'you entered',
    buttons: ['OK']
    
    });
    
    alert.present();
    
   this.navCtrl.setRoot(TabsPage) ;
    
    }else
    
    {
    
    let alert = this.alertCtrl.create({
    
    title:'Error',
    
    subTitle:dataFromServer.error,
    
    buttons: ['OK']
    
    });
    
    alert.present();
    
    }
    
    } ,
    error=>{
     console.log(error) ;
     loader.dismiss() ;
   
     
     }).catch(
       err=>
       {console.log(err) ;}
     );
    
  
    
    }
    
}