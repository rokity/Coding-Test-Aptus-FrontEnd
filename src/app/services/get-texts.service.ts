import { Injectable } from '@angular/core';
import { Text } from '../models/text';
import { TEXTS } from '../data/data-texts';


@Injectable({
  providedIn: 'root'
})
export class GetTextsService {

  constructor() { }

  getTexts(): Text[] {
    return TEXTS;
  }
}
