import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { User } from './Model/UserModel';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public readonly URL = "https://localhost:44333/";
  private hubConnection: HubConnection;
  private readMessage: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.BuildConnection();
    this.StartConnection();
  }

  public BuildConnection = () => {
    this.hubConnection = new HubConnectionBuilder().withUrl('/chathub').build();

  }

  public StartConnection = () => {
    this.hubConnection.start()
      .then(() => console.log("Connection started...."))
      .catch(err => console.log(err));
  }

  //Hub Invocation methods

  RegisterUser(UserModel: User): Observable<User> {
    return this.http.post<User>(this.URL + "Account/RegisterUser", UserModel);
  }

  LoginUser(UserModel: User): Observable<User> {
    this.hubConnection.invoke("Join", UserModel.userName);
    let initialvalue: string = `My ChatBot: Welcome ${UserModel.userName}`;
    this.readMessage = new BehaviorSubject(initialvalue);
    return this.http.post<User>(this.URL + "Account/LoginUser", UserModel);
  }

  SendMessage(textInput: string) {
    this.hubConnection.invoke("SendMessage", textInput);
  }

  //Hub Receive Methods

  JoinMessage(): Observable<string> {
    this.hubConnection.on("ReceiveMessage", (messages) => {
      this.readMessage.next(messages);
    });
    return this.readMessage.asObservable();
  }
  
}
