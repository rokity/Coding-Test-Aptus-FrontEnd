import { Component, OnInit, Input } from '@angular/core';
import { Entitiy } from '../models/entity';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  
  constructor(private comp: AppComponent) { }

  ngOnInit(): void {
  }

  _saveData(){
    this.comp.saveData();
  }

  _skipText(){
    this.comp.skipText();
  }

  _backText(){
    this.comp.backText();
  }
}
