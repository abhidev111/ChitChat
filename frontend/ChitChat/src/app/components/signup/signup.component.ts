import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChatserviceService } from 'src/app/services/chatservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private chatService: ChatserviceService,
    private _router: Router,
    private _toast : ToastrService) { }

  ngOnInit(): void {
  }
  signup(Name:String,Email:String, Password:String, Interests:String) {
    let InterestsArr = Interests.split(',')
    InterestsArr = InterestsArr.map((x) => x.trim())
    console.log(Name, Email, Password, InterestsArr)
    this.chatService.SignupService(Name, Email, Password, InterestsArr).subscribe((userdata: any) => {
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
      
    }, (error: any)=>{
      this._toast.error("Unable to register you at the moment");
      console.log(error);
    })
  }
}
