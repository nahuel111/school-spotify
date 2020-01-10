import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {StorageComponent } from '../../../utility/storage/storage.component';
import {Playlist } from '../../../models/playlist';


import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { FormControl} from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  searchField: FormControl;
  name:string;
  description:string;
  tableDB:string = "like-tracking";
  playlists$:Observable<any>;
  playlists:Playlist[];
  user:string = localStorage.getItem("userName");
  _storage:any;

  //#region Inputs and ouputs

  @Input() public trackId;
  @Input() public hideList;

  //#endregion

  //#region constructor and init

   constructor(private modalService: NgbActiveModal) {
    this._storage = new StorageComponent();
   }

   async ngOnInit() { 

    this._storage.openConnection(this.tableDB);

    this.clean();

    await this.load();
  }

  //#endregion

  //#region public method

  public addPlaylists(id:string){

   let notModified = [];
   let modified;

   this.playlists.forEach((item) => {
    if (item.id === id) {
      modified = new Playlist(id, item.name)
      modified.addTracks(this.trackId);     
    } else
    {
      notModified.push(item); 
    }
   });

    this.updateLists(notModified, modified);
 
  }
  
  public close() {
    this.modalService.close();
  }

  public async save() {

    await this.createPlayList();
 
    this.load();

  }

  //#endregion

  //#region private method

  private updateLists(notModify:any[], modify:any){
    
   notModify.push(modify);

  // this._storage.delete(this.tableDB, "playlists")

   console.log("resultado", notModify);

  // this._storage.add(this.tableDB, "playlists", notModify);

  }

  private clean(){
    this.name = null;
    this.description = null;
  }

  private async createPlayList(){

    await this.editPlayList();

    this.clean();
  }


  private async editPlayList(){

    const playlist = new Playlist(this.generateID(), this.name);
    playlist.addTracks(this.trackId);
 
    console.log("playlist", playlist);
    const result = await this._storage.getAll(this.tableDB);
    const playlists = [];
    result.forEach(element => {
     
      if(Array.isArray(element)){
        element.forEach(item => {
          if(item.type === "playlists"){
            playlists.push(item);
          }
        })
      }
    });

    playlists.push(playlist);
    await this._storage.add(this.tableDB, "playlists", playlists);
  }

  private async load(){ 

    this._storage.openConnection(this.tableDB)
    this.playlists$ = of(await this._storage.getAll(this.tableDB));
    this.playlists$
    .pipe(
      map((r) => r.find(x => Array.isArray(x))))
      .subscribe((data)=> {
      console.log("resultado ", data);
      this.playlists = data;
    });
  }

  private generateID():any {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  //#endregion

}
