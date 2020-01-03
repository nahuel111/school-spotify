import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SpotifyAccountService} from '../../services/spotify-account.service';
import { SpotifySearchService } from '../../services/spotify-search.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  userName: string = '';
  userNameSubscription: Subscription;

  constructor(
    private accountService : SpotifyAccountService,
    private searchService : SpotifySearchService,
    private router: Router ) { }

  ngOnInit() {
    this.userNameSubscription = this.accountService.userAccount$.subscribe(text => {
    this.userName = text;
  });
  }

  ngOnDestroy(): void {
   this.userNameSubscription.unsubscribe();
  }

  logout(){
    this.userName = null;
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    this.router.navigate(['/home']);
  }

  onkeyup(search){
    console.log("evento", search);
    if(search){
      this.searchService.search$.emit(search); 
    }

  }

}
