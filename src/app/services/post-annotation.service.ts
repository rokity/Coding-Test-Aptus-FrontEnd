import { Injectable } from '@angular/core';
import { Annotations} from '../models/annotations'
@Injectable({
  providedIn: 'root'
})
export class PostAnnotationService {
  annotations:Annotations[]=new Array();

  constructor() { }

  postAnnotation( data:Annotations): void  {
    this.annotations.push(data);
    console.log(data);
  }
}
