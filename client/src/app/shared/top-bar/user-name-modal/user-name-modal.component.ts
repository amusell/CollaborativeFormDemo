import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  templateUrl: './user-name-modal.component.html',
  imports: [NgbModalModule, FormsModule],
})
export class UserNameModalComponent {
  @Input()
  public userName: string = '';
  constructor(public readonly ngbActiveModal: NgbActiveModal) {}
}
