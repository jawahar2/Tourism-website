import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PtripsService {

  URL = "http://localhost:4000/user/ptrips";

  constructor(private http: HttpClient) { }
  fetch(): Observable<any> {
    let obj={uid: sessionStorage.getItem("userId")}
    return this.http.post(this.URL, obj);
  }

}
