import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {SpotifyPlaylistsService } from '../../../services/spotify-playlists.service';
import {SpotifyAccountService } from '../../../services/spotify-account.service';
import {StorageComponent } from '../../../utility/storage/storage.component';


import { Observable, of, pipe } from 'rxjs';
import { switchMap, debounceTime, catchError } from 'rxjs/operators';

import { FormControl,
  FormGroup,
  FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-modal',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  searchField: FormControl;

  name:string;
  valor:Observable<string>;
  lists:any[]=[];
  user:string = localStorage.getItem("userName");

  _storage:any;
  tableDB:string = "like-tracking";

  constructor(private modalService: NgbActiveModal,
    private playlistsService: SpotifyPlaylistsService,
    private accountService: SpotifyAccountService) {
      this._storage = new StorageComponent();
     }

  async ngOnInit() { 
    
     this._storage.openConnection(this.tableDB)
    await this.load();
    this.accountService.callback();
  }

  close() {
    this.modalService.close();
  }

   async save() {
    console.log("nombre", this.name);
    // this.lists.push({name:this.name,id:"124" + this.name}); 
    const playlist = {name: this.name, public:false,description:"", type:"playlists"};
   
    const result = await this._storage.getAll(this.tableDB);
    console.log("resultado py", result);
    const playlists = [];
    result.forEach(element => {
     
      if(Array.isArray(element)){
        element.forEach(item => {
          if(item.type === "playlists"){
            playlists.push(item);

          }
        })
      //playlists.push(element);
      }
    });

    playlists.push(playlist);
    await this._storage.add(this.tableDB, "playlists", playlists);
    this.load();
    // this.playlistsService.create(this.user, playlist).subscribe((r) => {
    //   console.log("nombre", r);
    //   this.load();
    // });
  
    this.name = null;

  }

  async load(){ 
    //   this.playlistsService.getAll(this.user).subscribe((r : any) => {
    //   console.log("resultado subscribe", r );
    //   this.lists = r.items;
    // });

    this.playlistsService.findById(this.user).subscribe((r : any) => {
      console.log("resultado subscribe", r );
      this.lists = r.items;
    });
  //  console.log("resultado listas", await this._storage.getAll(this.tableDB1));
  }

  delete(id){
    console.log("dddd", id);
   let result =this.lists.find(x => x.id !== id);
    this.lists = null;
    this.lists = result;
  }


  generateID():any {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  }


}
