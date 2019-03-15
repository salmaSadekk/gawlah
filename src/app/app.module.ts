import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { AuthService } from '../services/auth';
import {HttpClientModule} from '@angular/common/http' ;
import { SignInPage } from '../pages/sign-in/sign-in';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchPage } from '../pages/search/search';
import { ProfilePage } from '../pages/profile/profile';
import { ToursService } from '../services/Tours';
import { TourDetailPage } from '../pages/home/tour-detail/tour-detail';
import { DetailItemsPage } from '../pages/home/tour-detail/detail-items/detail-items';
import { TourCreationPage } from '../pages/tour-creation/tour-creation';
import { ItemsAddPage } from '../pages/tour-creation/items-add/items-add';
import { availableMonuments } from '../services/availableMonuments';
import { HTTP } from '@ionic-native/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera , CameraOptions } from '@ionic-native/camera';
import { NativeAudio } from '@ionic-native/native-audio';
import { Media } from '@ionic-native/media';
import { AudioPage } from '../pages/audio/audio';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignInPage ,
    SignUpPage ,
    TabsPage ,
    SearchPage ,
    ProfilePage ,
    TourDetailPage ,
    DetailItemsPage ,
    TourCreationPage ,
    ItemsAddPage ,
    AudioPage 



   
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignInPage ,
    SignUpPage ,
    TabsPage ,
    SearchPage ,
    ProfilePage ,
    TourDetailPage ,
    DetailItemsPage ,
    TourCreationPage ,
    ItemsAddPage ,
    AudioPage


 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService, 
    ToursService ,
    availableMonuments ,
   HTTP ,
   FileTransfer,
    Camera ,
    NativeAudio ,
    Media,
    File ,
    

  
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
