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



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tours:Tours[]=[] ;
 img:string ='' ;
  fileTransfer: FileTransferObject = this.transfer.create();
   constructor(private transfer: FileTransfer ,private file: File ,private navCtrl :NavController ,private toursService :ToursService,private app:App ,private authser:AuthService , private toastCtrl :ToastController ) {
   
   } /*
   audio() {
    const url = 'http://www.example.com/file.pdf';
    this.fileTransfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
    });
   } */
ionViewWillEnter() {
  this.tours =[] ;
  this.authser.setAuth(true) ;
  var data ={
    getTours:'s'
   } 
   console.log('data sendd try1 ') ;
  this.authser.SendData(data, 'http://192.168.43.87:8000/Gawlah/backup/get_tours.php' ).then(
    res=>{
      console.log('data sendd try2 ') ;
      console.log(res.error) ;
      console.log(res.headers) ;
      console.log(res.data) ;
      console.log(res.status) ;
      console.log(res.url) ;
      let dataFromServer = JSON.parse(res.data) ;
      for(var i =0 ; i< dataFromServer.length ;i++) {
      var   base64Data= dataFromServer[i].image;
 var converted_image= "data:image/jpeg;base64,"+base64Data;
 console.log('the image :'+ converted_image) ;
 //this.img= 'data:image/jpeg;base64,' + imageData;

        this.tours.push(new Tours('' ,dataFromServer[i].tour_id  ,dataFromServer[i].theme ,dataFromServer[i].name ,
        '' ,converted_image,'','',[],[],7 
         )) ;
      }
     // this.tours= this.toursService.getTours() ;

    }
   
  );
  


 
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
    
    console.log("Begin async operation");
    
    var data ={
      getTours:'s' ,
      last_tour_id: this.tours[this.tours.length -1].uid
     }
     console.log('it entered on infinite') ;
       return this.authser.SendData( data ,'http://192.168.43.87:8000/Gawlah/backup/get_tours.php' ).then(result => {
        console.log('it entered on infinite2') ;
            let dataFromServer = JSON.parse(result.data) ;
            for(var i =0 ; i< dataFromServer.length ;i++) {
           var   base64Data= dataFromServer[i].image;
         var converted_image= "data:image/jpeg;base64,"+base64Data;
         console.log('the image :'+ converted_image) ;
       
         
        
                this.tours.push(new Tours('' ,dataFromServer[i].tour_id  ,dataFromServer[i].theme ,dataFromServer[i].name ,
                '' ,converted_image,'','',[],[],7 
                 )) ;
              }
            // this.tours =  this.toursService.getTours() ;
            
    }) } 
    
    }
    
    
  

