import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from "@angular/forms"

import { HomeComponent } from './home/home.component';
import { SongListsComponent } from './song-lists/song-lists.component';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { TrackListComponent } from './track-list/track-list.component';
import { LikeSongsComponent } from './like-songs/like-songs.component';
import { EditComponent } from '../dialogs/playlists/edit/edit.component';

import { UtilityModule } from "../utility/utility.module";
import { RenamePipe } from "../pipes/rename.pipe";

import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    HomeComponent, 
    SongListsComponent,
    RenamePipe,
    ArtistListComponent,
    AlbumListComponent,
    TrackListComponent,
    LikeSongsComponent,
    EditComponent
  ],
    
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    UtilityModule,
    NgbModule.forRoot(),
    FormsModule  // ngModel
  ],
  providers: [
    NgbActiveModal
  ],
  entryComponents: [
    EditComponent
  ]

})
export class PagesModule { }
