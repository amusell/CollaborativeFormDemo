import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly userService: UserService
  ) {}

  public dossier = Object.freeze(
    Object.assign(
      (dossierId?: string) => ({
        read: () =>
          this.httpClient.get<IDossier & { id: string }>(
            `${environment.apiUrl}/dossier/${dossierId}`,
            { headers: this.userService.getHeader() }
          ),
        delete: () =>
          this.httpClient.delete<void>(
            `${environment.apiUrl}/dossier/${dossierId}`,
            { headers: this.userService.getHeader() }
          ),
        section: (sectionId: string) =>
          Object.freeze({
            read: () =>
              this.httpClient.get<ISection & { id: string }>(
                `${environment.apiUrl}/dossier/${dossierId}/section/${sectionId}`,
                { headers: this.userService.getHeader() }
              ),
            save: (data: ISection) =>
              this.httpClient.put<void>(
                `${environment.apiUrl}/dossier/${dossierId}/section/${sectionId}`,
                data,
                { headers: this.userService.getHeader() }
              ),
          }),
      }),
      {
        readAll: () =>
          this.httpClient.get<IDossier[]>(`${environment.apiUrl}/dossier`, {
            headers: this.userService.getHeader(),
          }),
        create: (dossier: Omit<IDossier, 'id' | 'userId' | 'creationDt'>) =>
          this.httpClient.post<IDossier & { id: string }>(
            `${environment.apiUrl}/dossier`,
            dossier,
            { headers: this.userService.getHeader() }
          ),
      }
    )
  );
}

export interface IDossier {
  id: string;
  userId: string;
  creationDt: Date;
}

export interface ISection {
  [key: string]: unknown;
}
