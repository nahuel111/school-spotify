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
    
    await this.storage.openConnection("my-list");
    await this.storage.add("my-list","korn",[{album:"Issues",theme:"Trash",id:"3423412ghfdsgdfg"}]);
   
    const firstParam: string = this.route.snapshot.queryParamMap.get('code');
    const secondParam: string = this.route.snapshot.queryParamMap.get('secondParamKey');
  }

  async onDelete(){
    await this.storage.delete("my-list", "korn01");
  }

  async onUpdate(){
    await this.storage.add("my-list","korn01",[{album:"Issues",theme:"Trash",id:"32534dsfgsdgf"}]);
  }

  async onUpdate1(){
    await this.storage.add("my-list","korn02",[{album:"Issues",theme:"Trash",id:"444444444444"}]);
  }

}
