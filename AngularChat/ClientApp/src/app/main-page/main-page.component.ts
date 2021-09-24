import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import * as moment from 'moment';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  public messages = [];
  public dateTime = moment().format("YYYY MM DD hh:mm:ss");

  constructor(public service: SharedService) { }

  ngOnInit() {
    this.DisplayMessage();
  }

  //Hub Invocation methods
  public Send(textInput: string) {
    this.service.SendMessage(textInput);
  }

  //Hub Receive methods
  public DisplayMessage() {
    this.service.JoinMessage().subscribe((data) => this.messages.push(data));
  }
}
