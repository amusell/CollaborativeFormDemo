import { Injectable } from '@angular/core';
import { CollaborativeForm } from '../../../../../collaborativeForm/client';

@Injectable({ providedIn: 'root' })
export class CollaborativeFormService {
  public readonly connection = new CollaborativeForm('localhost:5000');
}
