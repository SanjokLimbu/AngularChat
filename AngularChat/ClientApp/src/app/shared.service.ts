import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './Model/UserModel';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public readonly URL = "https://localhost:44333/";
  private hubConnection: HubConnection;

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

  RegisterUser(UserModel: User): Observable<User> {
    return this.http.post<User>(this.URL + "Account/RegisterUser", UserModel);
  }

  LoginUser(UserModel: User): Observable<User> {
    this.hubConnection.invoke("Join", UserModel.userName);
    return this.http.post<User>(this.URL + "Account/LoginUser", UserModel);
  }

  JoinMessage(): object {
    let messages: object;
    this.hubConnection.on("ReceiveMessage", (message) => {
      messages = message
      //messages = message;
    });
    return messages;
  }
}
