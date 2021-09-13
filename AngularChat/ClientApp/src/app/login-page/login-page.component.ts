import { Component, OnInit } from '@angular/core';
import { User } from '../Model/UserModel';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  userModel: User = {
    userName: null,
    passWord: null
  }

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  public error: any

  constructor(private service: SharedService,
    private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  ngOnInit(): void {
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  Login(userModel: User): void {
    this.service.LoginUser(userModel).pipe(map(user => {
      //Store user in local storage of browser
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }))
      .subscribe((data) => {
        this.router.navigate(['Main-Page']);
    },
      error => {
        this.error = "Username or Password is Incorrect.";
      });
  }

  Register(userModel: User): void {
    this.service.RegisterUser(userModel).subscribe((data) => {
      console.log(data);
      alert("Registration Successful");
    }, error => {
      this.error = "Username is already taken or username should be in aplhabets only.";
    });
  }

  showModal = -1;

  show(index) {
    this.showModal = index;
  }

  close() {
    this.showModal = -1;
  }
}
