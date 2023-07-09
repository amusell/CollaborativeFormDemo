import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  Subscription,
  distinctUntilChanged,
  filter,
  forkJoin,
  map,
  mergeMap,
  share,
  shareReplay,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs';
import {
  ROUTE_DOSSIER_ID,
  ROUTE_SECTION_ID,
} from '../../constants/route.constants';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../common/services/api.service';

@Component({
  templateUrl: './page-form.component.html',
  styleUrls: ['./page-form.component.scss'],
})
export class PageFormComponent implements AfterViewInit, OnDestroy {
  private readonly subscriptions: Subscription[] = [];
  public readonly form: FormGroup = new FormGroup({});
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly apiService: ApiService
  ) {}
  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.settings$
        .pipe(
          switchMap(({ dossierId, sectionId }) =>
            this.apiService.dossier(dossierId).section(sectionId).read()
          ),
          map((serverData) =>
            Object.keys(this.form.value).reduce(
              (aggr, key) => ({
                ...aggr,
                [key]:
                  typeof serverData?.[key] === 'undefined'
                    ? null
                    : serverData?.[key],
              }),
              {}
            )
          )
        )
        .subscribe((data) => {
          this.form.setValue(data);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions.length = 0;
  }

  private settings$ = this.activatedRoute.paramMap.pipe(
    map((paramMap) => ({
      dossierId: paramMap.get(ROUTE_DOSSIER_ID),
      sectionId: paramMap.get(ROUTE_SECTION_ID),
    })),
    /*
    startWith(null as any),
    distinctUntilChanged((prev, cur) =>
      Object.entries(cur).some(([key, value]) => value !== prev?.[key])
    ),
    */
    map((data) => data as { dossierId: string; sectionId: string }),
    filter((data) => !!data?.dossierId && !!data?.sectionId)
    //shareReplay()
  );

  public readonly formConfig$ = this.settings$.pipe(
    map(
      ({ sectionId }) =>
        (environment?.pages || []).find((page) => page?.slug === sectionId) ||
        null
    )
  );

  public save() {
    this.settings$
      .pipe(
        take(1),
        mergeMap(({ dossierId, sectionId }) =>
          this.apiService
            .dossier(dossierId)
            .section(sectionId)
            .save(this.form.value)
        ),
        tap(() => {
          this.form.markAsUntouched();
          this.form.markAsPristine();
        })
      )
      .subscribe();
  }
}
