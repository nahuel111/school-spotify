import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAccountService {

  baseUrl:string = 'https://accounts.spotify.com/authorize';
  userAccount$ = new EventEmitter<string>();

  constructor(private http: HttpClient) { }

  async login(){

    const redirectUri = encodeURIComponent('http://localhost:4200/login/');
    const scopes = 'user-read-private user-read-email';
    const query = this.baseUrl +
    '?response_type=code' +
    '&client_id=' + environment.account.clientId +
    (scopes? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + redirectUri + "&show_dialog=true";
    window.location.href =  query;

  }
  
   callback() {
    const url = `https://bootcamp-angular.herokuapp.com/spotify/${environment.account.clientId}/${environment.account.secretId}`;
     this.http.get(url).subscribe((data:any) => {
      console.log("token refresh 1",data.access_token );
    localStorage.setItem('token', data.access_token);
    })
   }

   refreshToken(){
    const refresh_token = Observable.create((observer:any) => {
      setInterval(() => {
        console.log("token..")
        observer.next(this.callback());
    }, 1000); //60000, 1.8e+6, 200000
    });
    refresh_token.subscribe((data) => {});
   }

     /**
     * prueba switchMap 
     * */ 
   switchMap(name:any) {
    const url = `https://bootcamp-angular.herokuapp.com/spotify/${environment.account.clientId}/${environment.account.secretId}`;
     return this.http.get(url);
   }
 }