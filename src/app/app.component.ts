import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, NavController, MenuController, App, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SignInPage } from '../pages/sign-in/sign-in';
import { ProfilePage } from '../pages/profile/profile';
import { TabsPage } from '../pages/tabs/tabs';
import { SponsorPage } from '../pages/sponsor/sponsor';
import { CurrentUser } from '../services/CurrentUser';
import { TestPage } from '../pages/test/test';
import { User } from '../Models/user';
import { Storage } from '@ionic/storage';
import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
 //rootPage:any = SignInPage;
 rootPage:any;
 isAuthenticated = false ;
  profilePage =ProfilePage ;
 
  sponsorPage =SponsorPage ;
  Img  = '' ;
  followers =false;
 
  @ViewChild('content') nav:NavController ;
  ionViewWillEnter() {

  }
  constructor( private alertCtrl :AlertController,private oneSignal :OneSignal, private storage :Storage,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private menuCtrl :MenuController , private app :App , private currentUser :CurrentUser) {
      var uid ;
      var name ;
      var ProfilePic ;
      
    
     
      this.storage .get('uid').then(res=>{
        uid=res ;
        console.log('uid came' +res) ;
        this.storage .get('name').then(res=>{
          name=res;
          this.storage .get('profileImg').then(res=>{
            ProfilePic=res ;
            this.currentUser.setUser(new User(uid , name , ProfilePic)) ;
            if(uid!==null) {
      
              this.currentUser.setUser(new User(uid
              , name
              , ProfilePic)) ;
              this.oneSignal.startInit('e2d3c118-911c-4403-851d-4ae46680b74f', '122286071455');
      this.oneSignal.sendTag("user_id",uid) ;
      this.oneSignal.endInit();
              this.rootPage = TabsPage ;
            } else{
              this.rootPage = SignInPage;
            }
          
            platform.ready().then(() => {
              // Okay, so the platform is ready and our plugins are available.
              // Here you can do any higher level native things you might need.
              if (this.rootPage==TabsPage) {
      this.oneSignal.startInit("e2d3c118-911c-4403-851d-4ae46680b74f", "122286071455");
              this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
              this.oneSignal.handleNotificationReceived().subscribe(data => this.onPushReceived(data.payload));
              this.oneSignal.handleNotificationOpened().subscribe(data => this.onPushOpened(data.notification.payload));
              this.oneSignal.endInit(); 
              //testSalma
              }
        
              this.storage.get('followingOnly').then(res=>{
                this.currentUser.followingOnly=res ; }
        
                )
              
              statusBar.styleDefault();
              splashScreen.hide();
            });


            ////////////////////////
            platform.registerBackButtonAction(() => {
              // Catches the active view
              let nav = this.app.getActiveNavs()[0];
              let activeView = nav.getActive();                
              // Checks if can go back before show up the alert
              if(activeView.name === 'TourCreationPage'|| activeView.name ==="ItemsAddPage" ||activeView.name ==="GamecreationPage"||activeView.name === "GameItemsaddPage") {
               
                /*  const confirm = this.alertCtrl.create({
                    title: 'Are you sure you want to cancel?',
                    message: 'click on cancel button to delete your progress',
                    buttons: [
                      {
                        text: 'Cancel',
                        handler: () => {
                          console.log('Canceled clicked');
                        }
                      } ,
                      {
                        text: 'Ok',
                        handler: () => {
                       
                        }
                      }
                      
                    ]
                  });
                  confirm.present(); */
                  console.log("won't close") ;
                

               }})
            ////////////////////////
            
           }
           )
         })
      })
     
      
     
    
   
  
  }
  changeState() {
    this.currentUser.followingOnly =this.followers ;
    console.log('ionChangeTest ..from current user ' +  this.currentUser.followingOnly  ) ;

  }
  private onPushReceived(payload: OSNotificationPayload) {
    alert('Push recevied:' + payload.body);
  }
  
  private onPushOpened(payload: OSNotificationPayload) {
    alert('Push opened: ' + payload.body);
  }
  GameView(){
    this.nav.push(HomePage , {GameView : true}) ;
  }
  onLoad(page :any) {
  this.nav.setRoot(page) ;
  this.menuCtrl.close() ;
  }
  onLogout(){
    this.storage.clear() ;
    this.app.getRootNav().setRoot(SignInPage);
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.nav.setRoot(page);
    this.nav.push(page) ;
  }
}

