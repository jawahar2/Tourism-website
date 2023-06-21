import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  URL1 = "http://localhost:4000/user/packages";
  URL2 = "http://localhost:4000/user/hotdeals";




  constructor(private http: HttpClient) { }
  fetch(): Observable<any> {
    return this.http.get(this.URL1);
  }
  fetchhotdeals(): Observable<any> {

    return this.http.get(this.URL2);
  }
}
