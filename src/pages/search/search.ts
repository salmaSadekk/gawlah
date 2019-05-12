import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth';
import { Tours } from '../../Models/Tours';
import { TourDetailPage } from '../home/tour-detail/tour-detail';
import { SearchService } from '../../services/search';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage implements OnInit {
  items:string[]=[];
  ini :string[] =[] ;
  i:number =0 ;
  myInput:string ;
  didChoose = false ;
  tours :Tours[] =[] ;

  constructor(private searchSer :SearchService, private authService :AuthService , private navCtrl :NavController , private navParams : NavParams) {
   
  }
  ionViewWillEnter() {

    if(this.searchSer.item!='') {
      this.search(this.searchSer.item) ;
      this.searchSer.item ='' ;
    }
   
  }
  ngOnInit(){
    let url =this.authService.search_by_theme ;
    this.authService.SendData({getAllThemes:'all'} , url).then(
         res=>{
           console.log(res.data) ;
           console.log(res.error) ;
           console.log(res.headers) ;
           console.log(res.status) ;
           console.log(res.url) ;
           let dataFromServer = JSON.parse(res.data) ;
           for(var i=0 ;i<dataFromServer.length ; i++) {
             this.items.push(dataFromServer[i]) ;
           }
           this.ini = this.items.slice() ;
         }
       )
  }

  initializeItems() {
 this.items= this.ini.slice() ;
  }
  onClickItem(item){
    console.log(item.name) ;
    this.navCtrl.push(TourDetailPage ,{item : item}) ;
  }
  search(item:string){
    this.tours=[] ;
    let url =this.authService.search_by_theme ;
this.authService.SendData({SearchKey:item} , url).then(
  res=>{
    
    console.log(res.data) ;
    console.log(res.error) ;
    console.log(res.headers) ;
    console.log(res.status) ;
    console.log(res.url) ;
    let dataFromServer = JSON.parse(res.data) ;
    console.log(dataFromServer) ;

    for(var i =0 ; i< dataFromServer.length ;i++) {
     

      this.tours.push(new Tours(dataFromServer[i].name ,dataFromServer[i].tour_id  ,dataFromServer[i].theme , dataFromServer[i].museum ,
        dataFromServer[i].creator,dataFromServer[i].image,'',dataFromServer[i].rating,[],[],dataFromServer[i].price ,
         dataFromServer[i].tour_info , dataFromServer[i].creator_id
         )) ;
    }


    this.didChoose =true ;

  }
)
  }

  getItems(ev) {
    this.didChoose =false ;
    // Reset items back to all of the items
   this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        var txt =  (item.toLowerCase().indexOf(val.toLowerCase()) > -1) ;
        this.i++ ;
        console.log('txt value'+this.i+txt) ;
        return txt;
      })
    }
  }
}