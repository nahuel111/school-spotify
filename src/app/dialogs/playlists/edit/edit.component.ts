import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  name:string;

  constructor(  private modalService: NgbActiveModal) { }

  ngOnInit() { }

  close() {
    this.modalService.close();
  }

  save() {
    console.log("nombre", this.name);
    this.modalService.close();
  }

}
