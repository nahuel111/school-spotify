import { Component, OnInit } from '@angular/core';
import {StorageComponent } from './../../utility/storage/storage.component';
import { Observable, from, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {
  _storage:any;
  tableDB:string = "like-tracking";
  playlists$:Observable<any>;
  playlists:any;
  constructor() {
    this._storage = new StorageComponent();
   }

 async ngOnInit() {
  this._storage.openConnection(this.tableDB)
    this.playlists$ = of(await this._storage.getAll(this.tableDB));
    this.playlists$
    .pipe(
      map((r   ) => r.find(x => Array.isArray(x))))
      .subscribe((data)=> {
      console.log("resultado ", data);
      this.playlists = data;
    });
  }

}
