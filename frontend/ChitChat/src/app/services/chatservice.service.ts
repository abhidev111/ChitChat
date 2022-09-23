import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDetails } from '../model';
import { environment } from '../environment'

@Injectable({
  providedIn: 'root'
})
export class ChatserviceService {

 constructor(private http:HttpClient) { }

  SigninService(Email:String, Password:String) {
    //let url = environment.BASE_URL + '/api/user/login/';
    return this.http.post<any>('http://localhost:8000/api/user/login/',{email : Email , password: Password});
  }
}

