import { Component, OnInit } from '@angular/core';
import { ApiService, IDossier } from '../../../common/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, tap } from 'rxjs';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public dossierList: IDossier[] = [];

  constructor(
    private readonly apiService: ApiService,
    public readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.apiService.dossier.readAll().subscribe((dossierList) => {
      this.dossierList = dossierList;
    });
  }

  new() {
    this.apiService.dossier
      .create({})
      .pipe(
        mergeMap(({ id }) =>
          this.router.navigate([id], { relativeTo: this.activatedRoute })
        )
      )
      .subscribe();
  }

  delete(dossierId: string) {
    this.apiService
      .dossier(dossierId)
      .delete()
      .pipe(
        tap(() => {
          this.dossierList = this.dossierList.filter(
            ({ id }) => id !== dossierId
          );
        })
      )
      .subscribe();
  }
}
