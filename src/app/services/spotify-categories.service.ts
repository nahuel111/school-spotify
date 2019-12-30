import { Injectable, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SpotifyCategoriesService {
  private baseUrl:string = environment.spotify.baseUrl;
  resource:string = "browse/categories";

  constructor(private http: HttpClient) { }

  async categoriesAll(){
    console.log("id categoriesAll service",this.baseUrl + this.resource );
    const token:string = localStorage.getItem("token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return await this.http.get(this.baseUrl + this.resource , { headers }).toPromise();
   }

   async geCategorie(type:string){
    const token:string = localStorage.getItem("token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return await this.http.get(this.baseUrl + this.resource + "/" + type , { headers }).toPromise();
   }

}
