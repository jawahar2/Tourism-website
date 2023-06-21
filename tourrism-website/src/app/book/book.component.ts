import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PackagesService } from '../packages/packages.service';
import { UntypedFormBuilder, Validators, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { BookService } from './book.service';




@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  // styleUrls: ['../../../node_modules/primeflex/primeflex.css']
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  destinationId : string;
  destinations: any;
  array: any;
  noOfDays: number;
  i: number=2;
  numArr: any;
  date: Date;
  bookForm: UntypedFormGroup;
  totalAmount: any;
  startdate: Date;
  enddate: Date;
  endday: any;
  endmonth: any;
  endyear: any;
  montharr : any=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  message1 : string;
  message2: string;
  booked: boolean=false;
  startdate1 : Date;
  displayModal: boolean=false;
  updated:any;


  constructor(private acroute: ActivatedRoute ,private fb: UntypedFormBuilder, private route : Router , private packagesserv : PackagesService ,private bookserv: BookService) { }

  ngOnInit() {
    this.bookForm=this.fb.group({
      No: ['' ,[ Validators.required , Validators.max(5) , Validators.min(1)]],
      cal: ['', [Validators.required , dateValidate]],
      plane: []

    })
    // this.check=this.bookForm.value.check;
    

    this.acroute.params.subscribe((success) => {
      this.destinationId=success["id"];
  })
  if(this.destinationId[0] === "D"){
    this.packagesserv.fetch().subscribe(
      (success)=> {
        this.destinations=success;
        this.do();
      });
  }else{
    this.packagesserv.fetchhotdeals().subscribe(
      (success)=> {
        this.destinations=success;
        this.do();
      });
  }
  
  

}
public do() {
  this.array=[];
  (this.destinations).forEach(element => {
    if((element.destinationId)===this.destinationId){
      this.array.push(element);
    }
  });

  this.noOfDays=(this.array[0].details.itinerary.dayWiseDetails.restDaysSightSeeing).length + 2;

  this.numArr=[];
  for(this.i=0; this.i<this.noOfDays-2; this.i++){
    this.numArr.push(this.i)
  }


}
charges(){
  if(this.bookForm.value.plane){
    this.totalAmount=(this.array[0].chargesPerPerson)*(this.bookForm.value.No) + (this.array[0].flightCharges)
  }
  else{
    this.totalAmount=(this.array[0].chargesPerPerson)*(this.bookForm.value.No);
  }
  this.message1="Your Trip ends on: "
  this.message2="You Pay: "

  this.startdate=new Date(this.bookForm.value.cal)
  this.enddate=this.startdate;
  this.enddate.setDate(this.enddate.getDate() + this.noOfDays-1)
  this.endmonth=this.montharr[this.enddate.getMonth()];
  

}

public book(){
  this.startdate1=new Date(this.bookForm.value.cal)
  this.bookserv.update1(this.array[0].destinationId , this.bookForm.value.No, this.startdate1, this.enddate).subscribe((success) =>{
    this.updated=success
  })
  this.booked=true;
  // this.route.navigate(['/plannedTrips']);
}

showModalDialog() {
  this.displayModal = true;
}
viewtrips(){
  this.route.navigate(['/plannedTrips'])
}
}

function dateValidate(input : UntypedFormControl){
  let tdate=new Date;
  let gdate=new Date(input.value);
  return (tdate < gdate) ? null : {
    Error: {message: "enter a valid date"}}
}
