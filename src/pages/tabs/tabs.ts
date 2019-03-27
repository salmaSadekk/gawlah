import { Component } from "@angular/core";
import { HomePage } from "../home/home";
import { SearchPage } from "../search/search";

import { ProfilePage } from "../profile/profile";


@Component({
    selector:'page-tabs' ,
    template :`
    <ion-tabs #tabParent> 
    <ion-tab [root]="homePage" tabTitle="Home" tabIcon="home" [rootParams]="{parent : tabParent }" ></ion-tab>
    <ion-tab [root]="searchPage"  tabTitle="search" tabIcon="search" [rootParams]="{parent : tabParent}" ></ion-tab>
    <ion-tab [root]="profile"  tabTitle="profile" tabIcon="person"  [rootParams]="{parent : tabParent}"></ion-tab>
    </ion-tabs>
    `

})
export class TabsPage{
homePage =HomePage ;
searchPage=SearchPage ;
profile=ProfilePage;
}