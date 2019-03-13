import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { LoadingController, AlertController, NavController } from 'ionic-angular';
import { CurrentUser } from '../../Models/currentUser';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

 constructor(private authService :AuthService ,
  private loading :LoadingController ,private alertCtrl :AlertController ,private navCtrl :NavController) {

  }
  onSubmit(f:NgForm){
    
    
    
    let loader = this.loading.create({
    
    content: 'Please wait a moment',
    
    });
    
    loader.present() ;
    var data = {
      email : f.value.email,
      password: f.value.password ,
      name: f.value.name
    } ;
      
    
    
    this.authService.SignUp(data
     )
    .subscribe((res:{error:boolean ,secondParam }) => {
    console.log(res.secondParam) ;
  
    loader.dismiss() ; 
    
   console.log(res.error) ;
    if(!res.error){
    console.log(res.secondParam.uid);
    console.log(res.secondParam.name);
    let alert = this.alertCtrl.create({
    
    title:'Registration successfull',
    
   
    
    buttons: ['OK']
    
    });
    
    alert.present();
    this.navCtrl.setRoot(TabsPage) ;
    
    console.log("you entered") ;
    
    }else
    
    {
    
    let alert = this.alertCtrl.create({
    
    title:'Error',
    
    subTitle:(res.secondParam),
    
    buttons: ['OK']
    
    });
    
    alert.present();
    
    }
    
    });
    
  
    
    }

}