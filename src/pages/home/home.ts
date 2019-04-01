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



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  flag=false ;
  tours:Tours[]=[] ;
 img:string ='' ;
  fileTransfer: FileTransferObject = this.transfer.create();
   constructor( private sponsorService : sponsorService ,private popoverCtrl :PopoverController,private navParams :NavParams,private searchSer :SearchService,private transfer: FileTransfer ,private file: File ,private navCtrl :NavController ,private toursService :ToursService,private app:App ,private authser:AuthService , private toastCtrl :ToastController ) {
   
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
  doneButton(){
    this.navCtrl.pop() ;
  }
ionViewWillEnter() {
  if(this.navParams.get('flag')!=null && this.navParams.get('flag')==true)
  this.flag = this.navParams.get('flag') ;
  this.tours =[] ;
  this.authser.setAuth(true) ;
  var data ={
    getTours:'s'
   } 
   let url = this.authser.get_tours ;
  
  this.authser.SendData(data, url).then(
    res=>{
     
      let dataFromServer = JSON.parse(res.data) ;
      for(var i =0 ; i< dataFromServer.length ;i++) {
     console.log(dataFromServer[i].image) ;

        this.tours.push(new Tours('' ,dataFromServer[i].tour_id  ,dataFromServer[i].theme ,dataFromServer[i].name ,
        '' ,dataFromServer[i].image,'','',[],[],7 
         )) ;
      }
     // this.tours= this.toursService.getTours() ;

    }
   
  );
  


 
}
onGameCreate() {
  this.app.getRootNav().setRoot(GamecreationPage);

}
search(theme){
 //this.navCtrl.push(SearchPage , theme)
 var t: Tabs = this.navCtrl.parent;
 this.searchSer.item =theme ;
 t.select(1);
}
  onClickItem(item:Tours){
  this.navCtrl.push(TourDetailPage ,item) ;
  }
  onTourCreate(){
    console.log('it enters here') ;
    this.app.getRootNav().setRoot(TourCreationPage);
  }
  Video(){
   // this.file.checkDir(this.file.dataDirectory, 'mydir').then(_ => console.log('Directory exists')).catch(err => console.log('Directory doesn\'t exist'));
  }
  doInfinite(e): Promise<any> {
    
   
    
    var data ={
      getTours:'s' ,
      last_tour_id: this.tours[this.tours.length -1].uid
     }
     let url = this.authser.get_tours ;
       return this.authser.SendData( data ,url ).then(result => {
       
            let dataFromServer = JSON.parse(result.data) ;
            for(var i =0 ; i< dataFromServer.length ;i++) {
          
       
                 console.log(dataFromServer[i].image) ;
        
                this.tours.push(new Tours('' ,dataFromServer[i].tour_id  ,dataFromServer[i].theme ,dataFromServer[i].name ,
                '' ,dataFromServer[i].image,'','',[],[],7 
                 )) ;
              }
            // this.tours =  this.toursService.getTours() ;
            
    }) } 
    
    }
    
    
  

