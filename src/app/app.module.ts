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
import { AudioPage } from '../pages/tour-creation/items-add/audio/audio';
import{StreamingMedia} from '@ionic-native/streaming-media' ;
import { CurrentUser } from '../services/CurrentUser';
import { MuseumsService } from '../services/AvailableMuseums';
import { CommentReviewComponent } from '../components/comment-review/comment-review';
import { AppRate } from '@ionic-native/app-rate';
import { StarRatingModule } from 'ionic3-star-rating';
import { MediaCapture } from '@ionic-native/media-capture';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SearchService } from '../services/search';
import { GamecreationPage } from '../pages/gamecreation/gamecreation';
import { GameItemsaddPage } from '../pages/gamecreation/game-itemsadd/game-itemsadd';
import { QuestionModalPage } from '../pages/gamecreation/game-itemsadd/question-modal/question-modal';
import { SponsorPage } from '../pages/sponsor/sponsor';
import { sponsorService } from '../services/sponsored';
import { OptionsPage } from '../pages/home/popover';



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
    AudioPage ,
    CommentReviewComponent ,
    GamecreationPage ,
    GameItemsaddPage ,
    QuestionModalPage ,
    SponsorPage ,
    OptionsPage




   
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StarRatingModule ,
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
    AudioPage ,
    GamecreationPage ,
    GameItemsaddPage  ,
    QuestionModalPage ,
    SponsorPage ,
    OptionsPage


 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService, 
    SearchService ,
    ToursService ,
    availableMonuments ,
   HTTP ,
   FileTransfer,
    Camera ,
    NativeAudio ,
    Media,
    File ,
    StreamingMedia,  
    CurrentUser ,
    MuseumsService ,
    AppRate  ,
    MediaCapture,
    StreamingMedia ,
    TextToSpeech ,
    sponsorService ,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
