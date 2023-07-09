import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { CollaborativeFormService } from './collaborative-form.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private session: { userName: string; uuid: string } | null = null;

  public get userName(): string {
    return this.session?.userName || '';
  }
  public set userName(userName: string) {
    if (this.session?.userName !== userName) {
      const session = {
        userName,
        uuid: uuid(),
      };
      this.collaborativeFormService.connection.setUser({
        userId: session.uuid,
        userName: session.userName,
      });
      this.session = session;
      sessionStorage.setItem('user', JSON.stringify(session));
    }
  }

  constructor(private collaborativeFormService: CollaborativeFormService) {
    this.session = JSON.parse(sessionStorage.getItem('user') || 'null');
    this.collaborativeFormService.connection.setUser({
      userId: this.session?.uuid || '',
      userName: this.session?.userName || '',
    });
  }

  public getHeader(): { [key: string]: string } {
    return this.session
      ? {
          'x-user-name': this.session?.userName,
          'x-user-id': this.session?.uuid,
        }
      : {};
  }
}
