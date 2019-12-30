import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { SpotifyAlbumsService } from '../../services/spotify-albums.service';
import { SpotifyCategoriesService } from '../../services/spotify-categories.service';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {
  type:string="album";
  url:any;
  album:any;
  tracks:any;
  pageIndex: number = 1;
  pageSize:number = 5;
  pageCount:number = 50;
  pageOptions = [5,10,15,20,25,30,35,40,45];

  constructor(
    private route:ActivatedRoute,
    private router: Router,
    private albumsService: SpotifyAlbumsService,
    public sanitizer:DomSanitizer) { }

  async ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://open.spotify.com/embed/album/' + id); 

    this.album = await this.albumsService.getById(id);
    const result = await this.albumsService.getTracks(id);
    this.tracks = result.items;

    console.log("tracks", result);
  }

  showImage(item){
    if(item.images == null  || item.images.length == 0 ){
      return "https://previews.123rf.com/images/xtate/xtate1601/xtate160100103/52027913-cuadros-vac%C3%ADos-sin-contenido-en-blanco-vista-frontal-retrato-marco-vertical-aislado-en-el-fondo-blanco.jpg";
    }else{
      if(item.images[0].url == null){
        return "https://previews.123rf.com/images/xtate/xtate1601/xtate160100103/52027913-cuadros-vac%C3%ADos-sin-contenido-en-blanco-vista-frontal-retrato-marco-vertical-aislado-en-el-fondo-blanco.jpg";
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
    this.router.navigate(['trackList', id]);
  }

}
