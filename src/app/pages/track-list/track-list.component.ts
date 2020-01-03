import { Component, OnInit } from '@angular/core';
import { SpotifyTracksService } from '../../services/spotify-tracks.service';
import { ActivatedRoute,Router } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.css']
})
export class TrackListComponent implements OnInit {
  type:string="track";
  url:any;
  track:any;

  constructor(private route:ActivatedRoute,
    private tracksService: SpotifyTracksService,
    private router: Router,
    public sanitizer:DomSanitizer) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log("id artista", id);
 
    this.track = await this.tracksService.getById(id);
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://open.spotify.com/embed/track/' + id); 
    console.log("canciones", this.track);
  }

}
