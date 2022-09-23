import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import{finalize, tap} from 'rxjs/operators';
import { ChatserviceService } from '../services/chatservice.service';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {

    constructor(private chatService:ChatserviceService , private router:Router){}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.headers.get('noauth')){
        return next.handle(request.clone());
    }
    else {
        this.chatService.showSpinner()
        const cloneReq = request.clone({
            headers :request.headers.set("Authorization","Bearer "+this.chatService.getToken())
        });
      
        return next.handle(cloneReq).pipe(
          tap(
            event => {},
            err=>{
              if(err.error.auth == false){
                this.router.navigateByUrl('/signin');
              }
            }
          )
        ).pipe(
      finalize(()=>{
        this.chatService.hideSpinner();
      })
    );

      }
  }
}
