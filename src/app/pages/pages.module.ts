import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { SongListsComponent } from './song-lists/song-lists.component';
//import { PaginatePipe } from '../pipes/paginate.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

import { UtilityModule } from "../utility/utility.module";
import { RenamePipe } from "../pipes/rename.pipe";
import { ArtistListComponent } from './artist-list/artist-list.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { TrackListComponent } from './track-list/track-list.component';
import { LikeSongsComponent } from './like-songs/like-songs.component';


@NgModule({
  declarations: [
    HomeComponent, 
    SongListsComponent,
    RenamePipe,
    ArtistListComponent,
    AlbumListComponent,
    TrackListComponent,
    LikeSongsComponent],
    
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    UtilityModule  
  ]

})
export class PagesModule { }
