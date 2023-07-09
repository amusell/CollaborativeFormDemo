import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

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

      this.session = session;
      sessionStorage.setItem('user', JSON.stringify(session));
    }
  }

  constructor() {
    this.session = JSON.parse(sessionStorage.getItem('user') || 'null');
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
