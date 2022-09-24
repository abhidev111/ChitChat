import { Component, OnInit } from '@angular/core';
import { ChatserviceService } from '../../services/chatservice.service'

// import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
// import {ErrorStateMatcher} from '@angular/material/core';



@Component({
  selector: 'app-chatpage',
  templateUrl: './chatpage.component.html',
  styleUrls: ['./chatpage.component.css']
})
export class ChatpageComponent implements OnInit  {
  messages: any = [];
  chat: any = [];
  loggedInUID = localStorage.getItem('loggedInUID');
  otherGuyName: String = "";
  otherGuyPic: String = "";
  constructor(private chatService: ChatserviceService) { }

 
  async ngOnInit(): Promise<void> {
    //this.chatService.getUserPayload();
    
    await this.chatService.BringMyrecentChats().subscribe((data: any) => {
      console.log(data);
      this.chat = [];
      // this.chat = data;
      // this.chat = data.map((s: string) => JSON.parse(s)) ;
      for (let i = 0; i < data.length; i++){
        this.chat[i] = (data[i])
        this.chat[i].otherGuy = this.findOtherGuy(data[i].users);
        this.chat[i].otherGuyPic = this.findOtherGuyPic(data[i].users);
      }
    }, (error: any) => {
      console.log(error);
    }
    )
  }

  async getMsg(chatId : String, otherGuyName: String, otherGuyPic:String) {
    await this.chatService.bringAllMsgsOfChat(chatId).subscribe((data) => {
      this.messages = []
      this.messages = data;
      this.otherGuyName = otherGuyName;
      this.otherGuyPic = otherGuyPic
      // console.log("see beloww")
      // console.log(data)
      // for (let i = 0; i < this.messages.length; i++){
      //   console.log(this.messages[i]._id)
      // }
    },(error: any) => {
      console.log(error);
    })
  }

  findOtherGuy(users:any) {
    console.log(users)
    return users[0]._id == this.loggedInUID ? users[1].name : users[0].name
  }
  findOtherGuyPic(users:any) {
    return users[0]._id == this.loggedInUID ? users[1].pic : users[0].pic
  }

}
