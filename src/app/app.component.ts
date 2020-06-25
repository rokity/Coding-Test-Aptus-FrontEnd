import { Component, ViewChild, ElementRef } from '@angular/core';

import { GetEntitiesService } from './services/get-entities.service';
import { Entitiy } from './models/entity';

import { GetTextsService } from './services/get-texts.service';
import { Text } from './models/text';

import { PostAnnotationService } from './services/post-annotation.service'
import { Annotations } from './models/annotations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'esercizio';
  entities: Entitiy[];
  texts: Text[];
  currentText: Text;
  entitySelected: string;
  element: HTMLElement;
  data: Annotations;
  selectedTextValue: string;
  entitySelectedValue: string;
  afterSelectedTextButtonValue: string = "";
  beforeSelectedTextButtonValue: string = "";
  index_text: any = 0;

  @ViewChild('textinput') textinput: ElementRef;
  @ViewChild('highlight') highlight: ElementRef;
  @ViewChild('selectedtextbutton') selectedtextbutton: ElementRef;
  @ViewChild('afterselectedtextbutton') afterselectedtextbutton: ElementRef;
  @ViewChild('beforelectedtextbutton') beforelectedtextbutton: ElementRef;
  @ViewChild('card') card: ElementRef;

  constructor(private getEntitiesService: GetEntitiesService, private getTextsService: GetTextsService, private postAnnotationService: PostAnnotationService) {
    this.getEntities();
    this.getTexts();
    this.currentText = this.texts[this.index_text];
  }

  ngAfterViewInit() {
    this.textinput.nativeElement.addEventListener('select', (event) => {
      this.selectedTextValue = event.target.value.substring(event.target.selectionStart, event.target.selectionEnd);
      this.buildAnimationSelectedWord();
    });
  }

  buildAnimationSelectedWord() {
    const _entity_selected = this.getSelectedEntity() - 1;
    if (_entity_selected != -1) {
      this.entitySelectedValue = this.entities[_entity_selected].value
      const start_selected_text = this.currentText.text.indexOf(this.selectedTextValue);
      const end_selected_text = start_selected_text + this.selectedTextValue.length;
      this.buildAnnotationsDataForServer(_entity_selected, start_selected_text, end_selected_text);
      this.textinput.nativeElement.classList.add("hidden");
      this.selectedtextbutton.nativeElement.classList.remove("hidden");
      this.selectedtextbutton.nativeElement.classList.add("display-inline");
      
      if (start_selected_text == 0) {
        this.afterSelectedTextButtonValue = this.currentText.text.substring(end_selected_text, this.currentText.text.length)
        this.afterselectedtextbutton.nativeElement.classList.remove("hidden")
        this.afterselectedtextbutton.nativeElement.classList.add("display-inline");
      }      
      else if (end_selected_text == this.currentText.text.length) {
        this.beforeSelectedTextButtonValue = this.currentText.text.substring(0, start_selected_text)
        this.beforelectedtextbutton.nativeElement.classList.remove("hidden")
        this.beforelectedtextbutton.nativeElement.classList.add("display-inline");
      }
      else if (end_selected_text != this.currentText.text.length && start_selected_text != 0) {
        this.beforeSelectedTextButtonValue = this.currentText.text.substring(0, start_selected_text)
        this.beforelectedtextbutton.nativeElement.classList.remove("hidden")
        this.beforelectedtextbutton.nativeElement.classList.add("display-inline");
        this.afterSelectedTextButtonValue = this.currentText.text.substring(end_selected_text, this.currentText.text.length)
        this.afterselectedtextbutton.nativeElement.classList.remove("hidden")
        this.afterselectedtextbutton.nativeElement.classList.add("display-inline");
      }
    }
  }

  getEntities(): void {
    this.entities = this.getEntitiesService.getEntities();
  }

  getTexts(): void {
    this.texts = this.getTextsService.getTexts();
  }

  postAnnotations(data: Annotations): void {
    this.postAnnotationService.postAnnotation(data);
  }

  selectEntity(id: number) {
    if (document.getElementsByClassName("selected").length != 0)
      document.getElementsByClassName("selected")[0].classList.remove('selected');
    document.getElementById(id.toString()).className += " selected";
  }

  getSelectedEntity() {
    if (document.getElementsByClassName("selected").length == 0)
      return null;
    else
      return Number(document.getElementsByClassName("selected")[0].getAttribute("id"));
  }

  saveData() {
    this.postAnnotations(this.data);
    this.card.nativeElement.classList.add("green-border");
    setTimeout(() => {
      this.resetTextContainer();
      this.clearEntitySelected();
      this.index_text++;
      this.currentText = this.texts[this.index_text];
      if (this.currentText == null)
        this.currentText = { text: "No more texts in the store!!", source: "N/A", doc_id: -1 }
    },500);
  }

  skipText() {
    this.resetTextContainer();
    this.clearEntitySelected();
    this.index_text++;
    this.currentText = this.texts[this.index_text];
    if (this.currentText == null)
      this.currentText = { text: "No more texts in the store!!", source: "N/A", doc_id: -1 }
  }

  backText() {
    this.resetTextContainer();
    this.clearEntitySelected();
    this.index_text--;
    this.currentText = this.texts[this.index_text];
    if (this.currentText == null)
      this.currentText = { text: "No more texts in the store!!", source: "N/A", doc_id: -1 }
  }

  clearEntitySelected() {
    if (document.getElementsByClassName("selected").length > 0)
      document.getElementsByClassName("selected")[0].classList.remove('selected');
  }

  resetTextContainer(){
    this.card.nativeElement.classList.remove("green-border");
    this.selectedtextbutton.nativeElement.classList.add("hidden");
    this.beforelectedtextbutton.nativeElement.classList.add("hidden")
    this.afterselectedtextbutton.nativeElement.classList.add("hidden")
    this.selectedtextbutton.nativeElement.classList.remove("display-inline");
    this.beforelectedtextbutton.nativeElement.classList.remove("display-inline")
    this.afterselectedtextbutton.nativeElement.classList.remove("display-inline")
    this.textinput.nativeElement.classList.remove("hidden");
  }

  buildAnnotationsDataForServer(_entity, start_selected_text, end_selected_text) {
    this.data = {
      doc_id: this.currentText.doc_id,
      annotations: [
        {
          type: this.entities[_entity].value,
          offset: {
            start_char: start_selected_text,
            end_char: end_selected_text
          }
        }
      ]
    }
  }
}
