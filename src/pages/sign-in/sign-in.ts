import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import {Http, Headers, RequestOptions}  from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthService } from '../../services/auth';
import { SignUpPage } from '../sign-up/sign-up';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

 
  constructor(public navCtrl: NavController, public navParams: NavParams ,private loading :LoadingController,
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
      email : f.value.email,
      password: f.value.password 
    } ;
      
    
    
    this.authService.signIn(data
     )
    .then(res => {
      console.log(res.data) ;
      let dataFromServer = JSON.parse(res.data) ;
      console.log("From Sign In :"+dataFromServer.error) ;
      console.log(res.status) ;
      console.log(res.headers) ;
      console.log(res.url) ;
    console.log('the error' +res.error) ;
    
   
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
    
    subTitle:dataFromServer.secondParam,
    
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