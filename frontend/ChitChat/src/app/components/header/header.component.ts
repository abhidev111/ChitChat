import { Component, OnInit } from '@angular/core';
import { ChatserviceService } from '../../services/chatservice.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private chatserviceService:ChatserviceService) { }
  loading$ = this.chatserviceService.loading$;
  ngOnInit(): void {
  }

}
