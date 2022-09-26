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
       this._toast.success('Success', "You've logged in successfully!!");
      console.log(userdata)
      localStorage.setItem("loggedInUID", userdata._id);
      localStorage.setItem("name", userdata.name);
      localStorage.setItem("token", userdata.token);
      localStorage.setItem("interests", userdata.interests);
      localStorage.setItem("email", userdata.email);
      localStorage.setItem("pic", userdata.pic);
      localStorage.setItem("userdata", JSON.stringify(userdata));
      
      this._router.navigate(['../chat'])
      this.chatService.showlogOutBtn()
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
