import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { UserNameModalComponent } from './user-name-modal/user-name-modal.component';
import { UserService } from '../../common/services/user.service';

@Component({
  standalone: true,
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  imports: [CommonModule, RouterModule, NgbModalModule, UserNameModalComponent],
  host: {
    class: 'sticky-top',
  },
})
export class TopBarComponent {
  constructor(
    private readonly userService: UserService,
    private readonly ngbModalService: NgbModal
  ) {}

  get userName() {
    return this.userService.userName;
  }

  open() {
    const modalInstance = this.ngbModalService.open(UserNameModalComponent, {
      ariaLabelledBy: 'modal-basic-title',
    });

    modalInstance.result.then((userName) => {
      this.userService.userName = userName;
    });
    modalInstance.componentInstance.userName = this.userName;
  }
}
