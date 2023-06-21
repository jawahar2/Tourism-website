import { Component } from '@angular/core';
import { Routes, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Wanderlust'; 
  userLoggedIn: string;
  userName: string;
  constructor( private router: Router){}
  ngOnInit(){
    // window.scrollTo(0, 0);
  }
  confirm(){
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }
  ngDoCheck(){
    this.userLoggedIn=sessionStorage.getItem('userId');
    this.userName=sessionStorage.getItem('userName');
  }
}
