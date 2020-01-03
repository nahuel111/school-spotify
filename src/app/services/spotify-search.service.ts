import { Injectable, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifySearchService {
  private baseUrl:string = environment.spotify.baseUrl;

  search$ = new EventEmitter<string>();

  constructor(private http: HttpClient) { }

  async serch(serch: string, type:string, limit: number):Promise<any> {
    const token:string = localStorage.getItem("token");
     const query = this.baseUrl +  "search" +
    '?q=' + serch + '&type='+ type +'&limit=' + limit + "&offset=1";

     const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
 
     return await this.http.get(query, {headers}).toPromise();
   }

   async get(type: string, id:string):Promise<any> {
    const token:string = localStorage.getItem("token");
     const query = this.baseUrl + type + '/' + id;

     const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

     return await this.http.get(query, {headers}).toPromise();
   }

}
