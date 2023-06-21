import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//ng prime and other styling modules
import {AccordionModule} from 'primeng/accordion'; 
import {MenuItem} from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import {SidebarModule} from 'primeng/sidebar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastModule} from 'primeng/toast';
import {FieldsetModule} from 'primeng/fieldset'
import {CalendarModule} from 'primeng/calendar'
import {InputSwitchModule} from 'primeng/inputswitch';



//the components modules
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PackagesComponent } from './packages/packages.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BookComponent } from './book/book.component';

//services
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';
import { PackagesService } from './packages/packages.service';


//routing
import { AppRoutingModule } from './app-routing.module';
import { PtripsComponent } from './ptrips/ptrips.component';
import { PtripsService } from './ptrips/ptrips.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookComponent,
    LoginComponent,
    PackagesComponent,
    PtripsComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AccordionModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    DialogModule,
    SidebarModule,
    ToastModule,
    FieldsetModule,
    CalendarModule,
    InputSwitchModule
  ],
  providers: [LoginService, RegisterService, PackagesService, PtripsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
