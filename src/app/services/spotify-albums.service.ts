import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SpotifyAlbumsService {
  private baseUrl:string = environment.spotify.baseUrl;
  resource:string = "albums/";

  constructor(private http: HttpClient) { }

  async all():Promise<any> {
    const token:string = localStorage.getItem("token");
     const query = this.baseUrl + this.resource + '/';

     const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

     return await this.http.get(query, {headers}).toPromise();
   }

  async getById(id:string):Promise<any> {
    const token:string = localStorage.getItem("token");
     const query = this.baseUrl + this.resource + id;

     const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

     return await this.http.get(query, {headers}).toPromise();
   }

   async getTracks(id:string):Promise<any> {
    const token:string = localStorage.getItem("token");
     const query = this.baseUrl + this.resource + id + "/" + "tracks";

     const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

     return await this.http.get(query, {headers}).toPromise();
   }

}
