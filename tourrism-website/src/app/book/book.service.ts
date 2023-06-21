import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  URL = "http://localhost:4000/user/book";

  constructor(private http: HttpClient) { }
  update1(destId , decvalue, startdate, enddate): Observable<any> {
    startdate=startdate.toJSON().slice(0,10);
    enddate=enddate.toJSON().slice(0,10);
    let obj={uid: sessionStorage.getItem("userId"), Id :destId , value : decvalue, startdate: startdate, enddate: enddate}
  return this.http.post(this.URL, obj);
}
}