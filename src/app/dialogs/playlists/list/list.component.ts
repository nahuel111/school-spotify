import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
@Input() lists: any;
@Output() deleteItem = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
    
  }

  delete(id:string){
   this.deleteItem.emit(id);
  }

}
