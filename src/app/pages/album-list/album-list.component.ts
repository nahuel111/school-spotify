import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { SpotifyAlbumsService } from '../../services/spotify-albums.service';
import { StorageComponent } from '../../utility/storage/storage.component';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {

  type:string="album";
  url:any;
  id:any;
  album:any;
  tracks:any;

  _storage:any;
  likesDB:string = "like-tracking";
  likes:any[];

  pageIndex: number = 1;
  pageSize:number = 5;
  pageCount:number = 50;
  pageOptions = [5,10,15,20,25,30,35,40,45];

  constructor(
    private route:ActivatedRoute,
    private router: Router,
    private albumsService: SpotifyAlbumsService,
    public sanitizer: DomSanitizer) {
      this._storage = new StorageComponent();
     }

  async ngOnInit() {
    this._storage.openConnection("like-tracking"); 

    this.id = this.route.snapshot.paramMap.get('id');
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://open.spotify.com/embed/album/' + this.id); 
    await this.load();

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


  async load(){
    console.log("load");
    this.album = await this.albumsService.getById(this.id);
    const result = await this.albumsService.getTracks(this.id);
    this.tracks = result.items;
    console.log("tracks", result);
    this.likes = await this._storage.getAll(this.likesDB); 
  
  }

  async like(item){

     console.log("like",  item);
     await this._storage.add(this.likesDB, item.id, item);
     this.likes = await this._storage.getAll(this.likesDB);     
  }

  async notLike(item){

    console.log("notLike",  item);
    await this._storage.delete(this.likesDB, item.id);
    this.likes = await this._storage.getAll(this.likesDB);     

  }

  showLike(id): boolean{

    if(!this.likes){
      return false;
    }
    let resultado = this.likes.find(x => x.id === id);

    return resultado ? true : false;
  }

  changingValue(e){
    this.pageSize = e;
  }
 
  viewType(id:string){
    this.router.navigate(['trackList', id]);
  }

}
