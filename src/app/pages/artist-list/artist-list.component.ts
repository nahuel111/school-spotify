import { Component, OnInit, EventEmitter, Output,Input } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { SpotifyArtistsService } from '../../services/spotify-artists.service';
import { SpotifyCategoriesService } from '../../services/spotify-categories.service';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {

  type:string="artist";
  url:any;
  artist:any;
  albums:any;
  pageIndex: number = 1;
  pageSize:number = 5;
  pageCount:number = 50;
  pageOptions = [5,10,15,20,25,30,35,40,45];


  constructor(
    private route:ActivatedRoute,
    private router: Router,
    private artistsService: SpotifyArtistsService,
    private categoriesService: SpotifyCategoriesService,
    public sanitizer:DomSanitizer) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://open.spotify.com/embed/artist/' + id); 

    this.artist = await this.artistsService.getById(id);
    console.log("artistas", this.artist);
    const result = await this.artistsService.getAlbums(id);
    this.albums = result.items;
    console.log("albums", result);

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

  changingValue(e){
    this.pageSize = e;
  }

  
  viewType(id:string){
    this.router.navigate(['albumList', id]);
  }


}
