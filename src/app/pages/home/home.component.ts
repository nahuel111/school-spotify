import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StorageComponent } from '../../utility/storage/storage.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  storage:any;

  constructor(private route: ActivatedRoute) { 
    this.storage = new StorageComponent();
  }

  async ngOnInit() {
    
    const firstParam: string = this.route.snapshot.queryParamMap.get('code');
    const secondParam: string = this.route.snapshot.queryParamMap.get('secondParamKey');
  }


}
