import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StorageComponent } from '../../utility/storage/storage.component';

@Component({
  selector: 'app-like-songs',
  templateUrl: './like-songs.component.html',
  styleUrls: ['./like-songs.component.css']
})
export class LikeSongsComponent implements OnInit {
  type:string="album";
  url:any;
  id:any;
  album:any;
  tracks:any;

  _storage:any;
  tableDB:string = "like-tracking";
  likes:any[];

  pageIndex: number = 1;
  pageSize:number = 5;
  pageCount:number = 50;
  pageOptions = [5,10,15,20,25,30,35,40,45];

  constructor(private router: Router,) {
    this._storage = new StorageComponent();
   }

  async ngOnInit() {
    this._storage.openConnection(this.tableDB); 
    this.likes = await this._storage.getAll(this.tableDB); 
    console.log("likes", this.likes);
  }

  async notLike(item){

    console.log("notLike",  item);
    await this._storage.delete(this.tableDB, item.id);
    this.likes = await this._storage.getAll(this.tableDB);     

  }

  viewType(id:string){
    this.router.navigate(['trackList', id]);
  }

}
