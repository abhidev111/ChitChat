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
  
  constructor(private chatService: ChatserviceService) { }

 
  async ngOnInit(): Promise<void> {
    //this.chatService.getUserPayload();
    
    await this.chatService.BringMyrecentChats().subscribe((data: any) => {
      console.log(data);
    }, (error: any) => {
      console.log(error);
    }
    )
  }

}
