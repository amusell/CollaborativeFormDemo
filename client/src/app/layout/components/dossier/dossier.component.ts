import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CollaborativeFormService } from '../../../common/services/collaborative-form.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription, map, tap } from 'rxjs';
import { ROUTE_DOSSIER_ID } from '../../constants/route.constants';

@Component({
  templateUrl: './dossier.component.html',
  styleUrls: ['./dossier.component.scss'],
})
export class DossierComponent implements OnInit, OnDestroy {
  private readonly subscriptions: Subscription[] = [];
  public readonly menuItems = environment.pages.map(({ label, slug }) => ({
    label,
    slug,
  }));

  constructor(
    private readonly collaborativeFormService: CollaborativeFormService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.paramMap
        .pipe(
          map((paramMap) => paramMap.get(ROUTE_DOSSIER_ID)),
          tap((dossierId) => {
            this.collaborativeFormService.connection.join(dossierId || '');
          })
        )
        .subscribe()
    );
  }
  ngOnDestroy(): void {
    this.collaborativeFormService.connection.join('');
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions.length = 0;
  }
}
