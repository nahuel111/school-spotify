import { Component, OnInit, Input } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { SpotifySearchService } from '../../services/spotify-search.service';
import { SpotifyAccountService } from '../../services/spotify-account.service'

@Component({
  selector: 'app-song-lists',
  templateUrl: './song-lists.component.html',
  styleUrls: ['./song-lists.component.css']
})
export class SongListsComponent implements OnInit {
  items:any;
  pageIndex: number = 1;
  pageSize:number = 5;
  pageCount:number = 50;
  pageOptions = [5,10,15,20,25,30,35,40,45];

  searchSubscription: Subscription;
  typeForm: FormGroup;
  


  constructor(private searchService: SpotifySearchService,
    private accountService: SpotifyAccountService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  async ngOnInit() {
    this.typeForm = this.formBuilder.group({
      controlType: ['artist', Validators.required]
  });
  
    this.searchSubscription = this.searchService.search$.subscribe(async text =>  {

      this.accountService.callback();
      const result = await this.searchService.serch(text, this.typeForm.controls.controlType.value, this.pageCount);
      this.items = result[this.typeForm.controls.controlType.value + 's'].items;

    });

  }

  ngOnDestroy(): void {
   this.searchSubscription.unsubscribe();
  }

  showImage(item){
    if(item.images == null  || item.images.length == 0 ){
      return "./assets/images/emty.jpg";
    }else{
      if(item.images[0].url == null){
        return "./assets/images/emty.jpg";
      }else{
        return item.images[0].url;
      }
    } 
  }

  showGenres(item){
    if(item.genres == null  || item.genres.length == 0 ){
      return "--";
    }else{
      if(item.genres[0] == null){
        return "--";
      }else{
        return item.genres[0];
      }
    } 
  }

  viewType(type:string, id:string){

    switch(type) { 
      case "artist": {        
       this.router.navigate(['artistList', id]);
         break; 
      } 
      case "album": { 
        this.router.navigate(['albumList', id]);
         break; 
      } 
      case "track": { 
        this.router.navigate(['trackList', id]);
        break; 
     } 
      default: { 
        "----"
         break; 
      } 
   } 
  }

  changingValue(e){
    this.pageSize = e;
  }

}
