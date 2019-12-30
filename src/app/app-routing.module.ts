import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SongListsComponent } from './pages/song-lists/song-lists.component';
import { ArtistListComponent } from './pages/artist-list/artist-list.component';
import { AlbumListComponent } from './pages/album-list/album-list.component';
import { TrackListComponent } from './pages/track-list/track-list.component';
import { LikeSongsComponent } from './pages/like-songs/like-songs.component';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'songList', component: SongListsComponent},
  {path:'likeSongs', component: LikeSongsComponent},
  {path:'artistList/:id', component: ArtistListComponent},
  {path:'albumList/:id', component: AlbumListComponent},
  {path:'trackList/:id', component: TrackListComponent},
  {path:'**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
