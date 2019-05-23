import { Component } from '@angular/core';
import { Tours } from '../../Models/Tours';
import { NavController, App, ToastController, Tabs, NavParams, PopoverController } from 'ionic-angular';
import { TourDetailPage } from './tour-detail/tour-detail';
import { ToursService } from '../../services/Tours';
import { TourCreationPage } from '../tour-creation/tour-creation';
import { AuthService } from '../../services/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AudioPage } from '../tour-creation/items-add/audio/audio';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { SearchPage } from '../search/search';
import { SearchService } from '../../services/search';
import { GamecreationPage } from '../gamecreation/gamecreation';
import { OptionsPage } from './popover';
import { sponsorService } from '../../services/sponsored';
import { ProfilePage } from '../profile/profile';
import { CurrentUser } from '../../services/CurrentUser';
import { ItemsAddPageModule } from '../tour-creation/items-add/items-add.module';
import { MessagesPage } from '../messages/messages';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  GameView=false ;
  flag=false ;
  tours:Tours[]=[] ;
 img:string ='' ;
  fileTransfer: FileTransferObject = this.transfer.create();
   constructor(   private currentUser :CurrentUser ,private sponsorService : sponsorService ,private popoverCtrl :PopoverController,private navParams :NavParams,private searchSer :SearchService,private transfer: FileTransfer ,private file: File ,private navCtrl :NavController ,private toursService :ToursService,private app:App ,private authser:AuthService , private toastCtrl :ToastController ) {
  
   } 
   Chat(){
     this.navCtrl.push(MessagesPage) ;
   }
   presentPopover(event ,item) {
    const popover = this.popoverCtrl.create(OptionsPage);
    popover.present({ev:event});
    popover.onDidDismiss(
      data=>{
        if(data.action=='sponsor')
        this.sponsorService.tours.push(item) ;
      }
    )
  }
  
  presentPopover2(event ,item , i) {
    const popover = this.popoverCtrl.create(OptionsPage , {fav :true});
    popover.present({ev:event  });
    popover.onDidDismiss(
      data=>{
        
        let url = this.authser.fav_tours ;
       this.authser.SendData( {user_id :this.currentUser.getUser().uid , tour_id :item.uid , username :this.currentUser.getUser().name ,creator_id :item.creator_id, tourname :item.TourName} ,url).then(
         res=>
         {
           console.log(res.data) ;
           console.log(res.error) ;
           console.log(res.headers) ;
           console.log(res.status) ;
           console.log(res.url) ;
           this.tours[i].favNum++ ;
           let dataFromServer = JSON.parse(res.data) ;
           this.tours[i].isFav = dataFromServer.fav_id ;

         }
       )
      }
    )
  
  }



  doneButton(){
    this.navCtrl.pop() ;
  }
  ionViewWillLeave() {
    this.GameView =false ;
    this.authser.tabs = false ;
  }
 
ionViewWillEnter() {
  this.authser.tabs = true ;

  if(this.navParams.get('flag')!=null && this.navParams.get('flag')==true)
  this.flag = this.navParams.get('flag') ;
   this.GameView = this.navParams.data.GameView;
   console.log('Game View value' + this.GameView) ;
   this.tours =[] ;
   this.authser.setAuth(true) ;
   var data :any;
  if(this.GameView !==undefined && this.GameView == true ){
   
    data ={
      getGames:'s'
     } 
     
     var url = this.authser.get_games ;
  }
  else{
    if(this.currentUser.followingOnly ==true ){
      data={
        getFavTours : 's' ,
        user_id : this.currentUser.getUser().uid ,
        
      }
    }
    else{
      data ={
        getTours:'s' ,
        user_id :this.currentUser.getUser().uid
       } 
    }
  
   
 
   var url = this.authser.get_tours ;
  }
  this.authser.SendData(data, url).then(
    res=>{
     
      let dataFromServer = JSON.parse(res.data) ;
      for(var i =0 ; i< dataFromServer.length ;i++) {
     console.log(dataFromServer[i].rating) ;

     this.tours.push(new Tours(dataFromServer[i].name ,dataFromServer[i].tour_id  ,dataFromServer[i].theme , dataFromServer[i].museum ,
      dataFromServer[i].creator,dataFromServer[i].image,'',dataFromServer[i].rating,[],[],dataFromServer[i].price ,
       dataFromServer[i].tour_info , dataFromServer[i].creator_id , dataFromServer[i].favNum , dataFromServer[i].isFav
       )) ;
      }
     // this.tours= this.toursService.getTours() ;

    }
   
  );
  

  


 
}

UserProfile(User_id){
 this.navCtrl.push(ProfilePage , {user_id : User_id}) ;
 

}
onGameCreate() {
 // this.app.getRootNav().setRoot(GamecreationPage);
 this.navCtrl.push(GamecreationPage) ;

}
onGameDetails(item){
  this.navCtrl.push(TourDetailPage , {Game:true ,item:item})
}
search(theme){
 //this.navCtrl.push(SearchPage , theme)
 var t: Tabs = this.navCtrl.parent;
 this.searchSer.item =theme ;
 t.select(1);
}
  onClickItem(item:Tours){
  this.navCtrl.push(TourDetailPage ,{item:item}) ;
  }
  onTourCreate(){
    console.log('it enters here') ;
    //this.app.getRootNav().setRoot(TourCreationPage);
    this.navCtrl.push(TourCreationPage) ;
  }
  Video(){
   // this.file.checkDir(this.file.dataDirectory, 'mydir').then(_ => console.log('Directory exists')).catch(err => console.log('Directory doesn\'t exist'));
  }
  doInfinite(e): Promise<any> {
    var data:any ;
    if(this.GameView !==undefined && this.GameView == true) {
      data ={
        getGames:'s' ,
        last_game_id: this.tours[this.tours.length -1].uid
       }
      var url = this.authser.get_games ;
      console.log('from spinner' + this.tours[this.tours.length -1].uid) ;
      console.log("length of tours" + this.tours.length) ;

      
    } else{
      if(this.currentUser.followingOnly ==true ){
        data={
          getFavTours : 's' ,
          user_id : this.currentUser.getUser().uid ,
          last_tour_id: this.tours[this.tours.length -1].uid
        }
      } else{
        data ={
          getTours:'s' ,
          last_tour_id: this.tours[this.tours.length -1].uid
         }
      }
      
      var url = this.authser.get_tours ;
    }
    
   
    
   
       return this.authser.SendData( data ,url ).then(result => {
       
            let dataFromServer = JSON.parse(result.data) ;
            console.log('from withim the spinner ' +result.data)
            for(var i =0 ; i< dataFromServer.length ;i++) {
          
       
                 console.log(dataFromServer[i].image) ;
                
                 this.tours.push(new Tours(dataFromServer[i].name ,dataFromServer[i].tour_id  ,dataFromServer[i].theme , dataFromServer[i].museum ,
                 dataFromServer[i].creator,dataFromServer[i].image,'',dataFromServer[i].rating,[],[],dataFromServer[i].price ,
                  dataFromServer[i].tour_info , dataFromServer[i].creator_id , dataFromServer[i].favNum , dataFromServer[i].isFav
                  )) ;
              }
            // this.tours =  this.toursService.getTours() ;
            
    }) } 
    
    }
    
    
  

