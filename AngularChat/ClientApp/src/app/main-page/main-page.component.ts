import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  public messages = [];
  public readonly URL = "https://localhost:44333/chathub";
  returnmessage: string;

  constructor(public service: SharedService) {
  }

  ngOnInit() {
    this.DisplayMessage();
  }

  public DisplayMessage() {
    //let messages: string[];
    this.messages.push(this.service.JoinMessage());
  }
}
