import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { tap, map, filter } from 'rxjs/operators';
import { Observable, OperatorFunction, pipe } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SpotifyPlaylistsService {

  private baseUrl:string = environment.spotify.baseUrl;
  resource:string = "playlists/";


  constructor(private http: HttpClient) { }

   create(user:string, data:any) {

    const token:string = localStorage.getItem("token");
    const query = `${this.baseUrl}users/${user}/playlists`;
     const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    console.log("create l :",user , data);
     return  this.http.post(query, data, {headers});
     
   }

   getAll(user:string) {

    const token:string = localStorage.getItem("token");
     const query = `${this.baseUrl}users/${user}/playlists`;
    

     const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

     return this.http.get(query, {headers}).pipe(map((data:any)=> {
       console.log("mapa", data.items);
       return data.items.find(x => x.id == "7r07fvMNEqgV6YirTKpIge");
     }));
   }

    find(user:string, query:any) {

    const token:string = localStorage.getItem("token");
    const uri = `${this.baseUrl}users/${user}/playlists`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(uri, {headers}).pipe(query());
   }

   async getAlbums(id:string):Promise<any> {
    const token:string = localStorage.getItem("token");
     const query = this.baseUrl + this.resource + id + "/" + "albums";

     const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

     return await this.http.get(query, {headers}).toPromise();
   }



   findById(id:string): Observable<any>
   {
    const query = () => map((data:any) => {
      console.log("mapa", data.items);
      return data.items.find(x => x.id == "7r07fvMNEqgV6YirTKpIge");
    });
    return this.find("nahuel11", query);
   }


   
}
