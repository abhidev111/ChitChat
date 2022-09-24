import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDetails } from '../model';
import { environment } from '../environment'

@Injectable({
  providedIn: 'root'
})
export class ChatserviceService {

  noAuthHeader = {headers : new HttpHeaders({'NoAuth':'True'})}
  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();
  
  constructor(private http: HttpClient) { }
  
  showSpinner(){
    this._loading.next(true);
  }
  hideSpinner(){
    this._loading.next(false);
  }

  SigninService(Email:String, Password:String) {
    //let url = environment.BASE_URL + '/api/user/login/';
    return this.http.post<any>('http://localhost:8000/api/user/login/',{email : Email , password: Password}, this.noAuthHeader);
  }

  SignupService(Email:String, Password:String) {
    //let url = environment.BASE_URL + '/api/user/login/';
    return this.http.post<any>('http://localhost:8000/api/user/',{email : Email , password: Password}, this.noAuthHeader);
  }

  BringMyrecentChats() {
    return this.http.get<any>('http://localhost:8000/api/chat/');
  }

  bringAllMsgsOfChat(chatId: String) {
    let url = 'http://localhost:8000/api/message/' + chatId;
    return this.http.get<any>(url);
  } 
  
   setToken(token : string){
    localStorage.setItem('token',token);
    
  }

  getToken(){
    return localStorage.getItem('token');
  }

  deleteToken(){
    localStorage.removeItem('token');
  }

  getUserPayload(){
    var token = localStorage.getItem('token');
    // var userdata = localStorage.getItem('userdata')
    // if(userdata)
    // console.log(JSON.parse(userdata).token)
  
    if(token){
      var payload = atob(token.split('.')[1]);  //this will be in just text form
      //return JSON.parse(payload);   //this makes it as a json object
      //console.log(JSON.parse(payload))
      return JSON.parse(payload);
    }
    else 
      return null;
  }

  isLoggedIn(){
    var payload = this.getUserPayload();
    
    if(payload){
      return payload.exp > Date.now()/1000;
    }
    return false;
    
  }
}

