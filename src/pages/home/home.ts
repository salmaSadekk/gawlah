import { Component } from '@angular/core';
import { Tours } from '../../Models/Tours';
import { NavController, App, ToastController } from 'ionic-angular';
import { TourDetailPage } from './tour-detail/tour-detail';
import { ToursService } from '../../services/Tours';
import { TourCreationPage } from '../tour-creation/tour-creation';
import { AuthService } from '../../services/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AudioPage } from '../tour-creation/items-add/audio/audio';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { SearchPage } from '../search/search';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tours:Tours[]=[] ;
 img:string ='' ;
  fileTransfer: FileTransferObject = this.transfer.create();
   constructor(private transfer: FileTransfer ,private file: File ,private navCtrl :NavController ,private toursService :ToursService,private app:App ,private authser:AuthService , private toastCtrl :ToastController ) {
   
   } 
ionViewWillEnter() {
  this.tours =[] ;
  this.authser.setAuth(true) ;
  var data ={
    getTours:'s'
   } 
  
  this.authser.SendData(data, 'http://192.168.1.9/Gawlah/backup/get_tours.php' ).then(
    res=>{
     
      let dataFromServer = JSON.parse(res.data) ;
      for(var i =0 ; i< dataFromServer.length ;i++) {
     

        this.tours.push(new Tours('' ,dataFromServer[i].tour_id  ,dataFromServer[i].theme ,dataFromServer[i].name ,
        '' ,dataFromServer[i].image,'','',[],[],7 
         )) ;
      }
     // this.tours= this.toursService.getTours() ;

    }
   
  );
  


 
}
search(theme){
 this.navCtrl.push(SearchPage , theme)
}
  onClickItem(item:Tours){
  this.navCtrl.push(TourDetailPage ,item) ;
  }
  onTourCreate(){
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
     
       return this.authser.SendData( data ,'http://192.168.1.9/Gawlah/backup/get_tours.php' ).then(result => {
       
            let dataFromServer = JSON.parse(result.data) ;
            for(var i =0 ; i< dataFromServer.length ;i++) {
          
       
         
        
                this.tours.push(new Tours('' ,dataFromServer[i].tour_id  ,dataFromServer[i].theme ,dataFromServer[i].name ,
                '' ,dataFromServer[i].image,'','',[],[],7 
                 )) ;
              }
            // this.tours =  this.toursService.getTours() ;
            
    }) } 
    
    }
    
    
  

