import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SpotifyArtistsService {
  private baseUrl:string = environment.spotify.baseUrl;
  resource:string = "artists/";

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

   async getAlbums(id:string):Promise<any> {
    const token:string = localStorage.getItem("token");
     const query = this.baseUrl + this.resource + id + "/" + "albums";

     const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

     return await this.http.get(query, {headers}).toPromise();
   }

}
