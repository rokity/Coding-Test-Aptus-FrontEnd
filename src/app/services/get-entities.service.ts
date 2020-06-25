import { Injectable } from '@angular/core';
import { Entitiy } from '../models/entity';
import { ENTITIES } from '../data/data-entities';

@Injectable({
  providedIn: 'root'
})
export class GetEntitiesService {

  constructor() { }

  getEntities(): Entitiy[] {
    return ENTITIES;
  }
}
