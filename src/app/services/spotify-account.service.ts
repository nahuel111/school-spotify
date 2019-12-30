import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment'
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAccountService {

  baseUrl:string = 'https://accounts.spotify.com/authorize';
  userAccount$ = new EventEmitter<string>();

  constructor(private http: Http) { }

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

   async callback() {
    const url = `https://bootcamp-angular.herokuapp.com/spotify/${environment.account.clientId}/${environment.account.secretId}`;
    const token = (await this.http.get(url).toPromise()).json().access_token;
    console.log("token refresh",token );
    localStorage.setItem('token', token);   
   }
   
}