import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PtripsService } from './ptrips.service';

@Component({
  selector: 'app-ptrips',
  templateUrl: './ptrips.component.html',
  styleUrls: ['./ptrips.component.css']
})
export class PtripsComponent implements OnInit {
  ptripsarray:any;
  loggedin:boolean;
  date:string;
  month:string;
  year:string;
  diag:any;
  montharr : any=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  constructor(private acroute: ActivatedRoute, private ptripserv : PtripsService, private router: Router) {}

  ngOnInit() {
    if(sessionStorage.getItem("userId")!==null){
      this.loggedin=true
    }else{
      this.loggedin=false
    }
    this.ptripserv.fetch().subscribe((success)=>{
      this.ptripsarray=[];
      this.ptripsarray=success;
      this.do();
    } 
    )
    
  }
  login(){
    this.router.navigate(['/login'])
  }
  do(){
  this.date=this.ptripsarray
  if (this.ptripsarray.length==0){
    this.diag=0;
  }
  else this.diag=1;
  
  }
  book(){
    this.router.navigate(['/home'])
  }

}
