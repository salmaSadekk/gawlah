import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SignInPage } from '../pages/sign-in/sign-in';
import { ProfilePage } from '../pages/profile/profile';
import { TabsPage } from '../pages/tabs/tabs';
import { SponsorPage } from '../pages/sponsor/sponsor';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
 rootPage:any = SignInPage;

  profilePage :ProfilePage ;
 
  sponsorPage :SponsorPage ;
 
  @ViewChild('content') nav:NavController ;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private menuCtrl :MenuController , private app :App) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
   
  }
  onLoad(page :any) {
  this.nav.setRoot(page) ;
  this.menuCtrl.close() ;
  }
  onLogout(){
    this.app.getRootNav().setRoot(SignInPage);
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(SponsorPage);
  }
}

