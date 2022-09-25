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
  SearchChat: any = [];
  loggedInUID = localStorage.getItem('loggedInUID');
  otherGuyName: String = "";
  otherGuyPic: String = "";
  ChatId: String = "";
  toggleSwitch: Boolean = false;
  found: Boolean = true;
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
      this.ChatId = chatId
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

  sendMessage(mesg: String) {
    if (this.ChatId != "" && mesg != "") {
      this.chatService.sndMessage(mesg, this.ChatId).subscribe((data: any) => {
        console.log(data);
        this.messages.push(data)
      })
    }
    else {
      console.log(this.ChatId , mesg)
      console.log("chatId not found or msg empty")
      return;
    }
  }
  
  SearchUser(searchParam: String) {
    this.chatService.searchPpl(searchParam).subscribe((data: any) => {
      console.log(data)
      this.found = true
      this.SearchChat = data
      if (data.length == 0)
          this.found =false
      this.toggleSwitch = true;
    },(error: any) => {
      console.log(error)
    })
  }

  establishChat(Id: String) {
    this.chatService.estblishChat(Id).subscribe((data: any) => {
      console.log(data)
      // if (this.chat.includes(data)) {
      //   this.chat = [...new Set(this.chat)]
      //   console.log("duplicate idiyooooooo")
      //  }
        this.chat.unshift(data)
        this.chat[0].otherGuy = this.findOtherGuy(data.users);
        this.chat[0].otherGuyPic = this.findOtherGuyPic(data.users);
      /// wierd logic
      /*
      obj.arr = obj.arr.filter((value, index, self) =>
      index === self.findIndex((t) => (
    t.place === value.place && t.name === value.name
  ))
)
      
      */
      this.chat = this.chat.filter((value:any, index:any, self:any) => 
        index === self.findIndex((t:any) =>(
            t._id === value._id
        )
      ))

      ///
      this.toggler();
      this.getMsg(data._id, this.chat[0].otherGuy, this.chat[0].otherGuyPic)
    }, (error: any)=>{
      console.log(error)
    })
  }

  toggler() {
    this.toggleSwitch = !this.toggleSwitch;
  }

}
