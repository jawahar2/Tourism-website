import { Component, OnInit } from '@angular/core';
import { PackagesService } from './packages.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})

export class PackagesComponent implements OnInit {
  showItinerary: Boolean = false;
  destinations : any;
  searchtxt: String;
  continents: any = ["asia" , "europe" , "australia"];
  temp: Number=0;
  array1: any;
  text : any;
  loggedin : boolean;
  temp1: boolean = true;
  havedata: boolean;
  array1len:number;
  constructor(private acroute: ActivatedRoute, private packagesserv : PackagesService, private router: Router) {
    
   }
  ngOnInit() {
    if(sessionStorage.getItem("contactNo") === null){
      this.loggedin=false
    }else{
      this.loggedin=true;
    }
    this.acroute.params.subscribe((success) => {
      this.searchtxt=success["id"];
      if(success.id){
        this.packagesserv.fetch().subscribe(
          (success1)=> {
            this.destinations=success1;
            if(this.destinations.length===0){
              this.havedata=false;
            }
            else this.havedata=true;
            this.getitinerary();
        })
      }
      else{
        this.packagesserv.fetchhotdeals().subscribe(
          (success2)=> {
            this.destinations=success2;
            if(this.destinations.length===0){
              this.havedata=false;
            }
            else this.havedata=true;

            this.getitinerary();
        })
      }
      
    }
    );
}

public getitinerary() {
  if(this.searchtxt){
    this.showItinerary = true;
    (this.continents).forEach(element => {
      if(element.toLowerCase()===this.searchtxt.toLowerCase()){
        this.temp=1;
      }
      });
    if(this.temp===1){
      this.array1=[];
      this.text=this.searchtxt.toLowerCase();
      (this.destinations).forEach(element => {
        if(((element.continent).toLowerCase()).match((new RegExp(this.text)))){
          this.array1.push(element)
        }

        
      });

    }else{
      this.array1=[];
      this.text=this.searchtxt.toLowerCase();
      (this.destinations).forEach(element => {
        if(((element.name).toLowerCase()).match((new RegExp(this.text)))){
          this.array1.push(element)
    }
   });
  }
  }

  else{
    this.array1=[];
    (this.destinations).forEach(element => {
      this.array1.push(element);
    });
  }
    this.array1len=this.array1.length
}

public book(id){
  if(this.loggedin){
    this.router.navigate(['/book' , id]);
  }
  else{
    
    this.temp1=false;
  }
}
login(){
  this.router.navigate(['/login'])
}
goback(){
  this.router.navigate(['/'])
}
}
