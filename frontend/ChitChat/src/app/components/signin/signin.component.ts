import { Component, OnInit } from '@angular/core';
import { ChatserviceService } from '../../services/chatservice.service'
import { UserDetails } from '../../model'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private chatService: ChatserviceService,
    private _router: Router,
    private _toast : ToastrService
  ) { }

  ngOnInit(): void {
  }

  login( email:String ,  password:String) {
    this.chatService.SigninService(email, password).subscribe((userdata: any) => {
       this._toast.success('Hello world!', 'Toastr fun!');
      console.log(userdata)
      localStorage.setItem("userdata",userdata)
      this._router.navigate(['../chat'])

    }, (error: any) => {
      console.log(error.status)
      if(error.status==403)
        this._toast.error("Wrong/Invalid credentials !!")
      else if (error.status == 500)
        this._toast.error("email and password is case sensitive !!")
        else
      this._toast.error("Unable to login at the moment")
    })
  }

}
