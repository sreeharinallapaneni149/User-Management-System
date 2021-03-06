import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import {first, map} from 'rxjs/operators';

import { ConnectionService, User } from '../services/connection.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  DBemail:any;
  userdetailsarray: User[] = [];
  public ov:any;
  public emailcheck=0;
  public passwordcheck=0;
  public db= new Array();
  DBpassword:any;
  public LoginError = false;
  public LoadingSpinner = false;
  public body:any;
  public ServerError=false;
  
  constructor(private router:Router, public connectionService:ConnectionService) { 
   this.DBemail=connectionService.dbemail;
   this.DBpassword=connectionService.dbpassword;
  }

  ngOnInit(): void {
    this.connectionService.API.subscribe(
      response => {
        console.log(response);
        this.userdetailsarray = response;
      }
    );
  }

  move_to_register(){
    this.router.navigateByUrl('/register');
  }
  move_to_forgot_password(){
    this.router.navigateByUrl('/forgot-password');
  
  }
  
  onSubmit(loginForm:NgForm){
    this.LoadingSpinner=true;
    var username=loginForm.controls.UserName.value;
    var password=loginForm.controls.Password.value;
  
  
    this.connectionService
        .login(username, password)
        .pipe(first())
        .subscribe({
          next: data => {
            this.LoginError=false;
            this.ServerError=false;
            this.router.navigateByUrl('/dashboard');
            this.LoadingSpinner=false;
            
          },
          error: error => {
            if(error.status==404){
              this.LoadingSpinner=false;
            this.LoginError=false;
            this.ServerError=true;
            }
            else{
            this.ServerError=false;
            this.LoadingSpinner=false;
            this.LoginError=true;
            }
          }
      });
       
   
      
    }
  
}
