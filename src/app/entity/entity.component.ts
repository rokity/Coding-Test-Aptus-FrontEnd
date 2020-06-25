import { Component, OnInit, Input } from '@angular/core';
import { Entitiy } from './../models/entity'
import { $ } from 'protractor';
@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {

  @Input() entity: Entitiy;
  @Input() index: Number;
  selected : boolean=false;

  constructor() { }

  ngOnInit(): void {
    
  }

  selectEntity(){    
    // $(".selected").removeClass("selected");
    // $("#"+this.index).addClass("selected");
  }

}
