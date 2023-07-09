import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DossierComponent } from './components/dossier/dossier.component';
import { PageFormComponent } from './components/page-form/page-form.component';
import { SideBarComponent } from '../shared/side-bar/side-bar.component';
import { DynFormComponent } from '../shared/dyn-form/dyn-form.component';
import {
  ROUTE_DOSSIER_ID,
  ROUTE_DOSSIER_SLUG,
  ROUTE_SECTION_ID,
} from './constants/route.constants';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SideBarComponent,
    DynFormComponent,
    RouterModule.forChild([
      {
        path: ROUTE_DOSSIER_SLUG,
        children: [
          {
            path: '',
            component: HomeComponent,
          },
          {
            path: `:${ROUTE_DOSSIER_ID}`,
            component: DossierComponent,
            children: [
              {
                path: `:${ROUTE_SECTION_ID}`,
                component: PageFormComponent,
              },
            ],
          },
        ],
      },
    ]),
  ],
  declarations: [HomeComponent, DossierComponent, PageFormComponent],
  exports: [RouterModule],
})
export class LayoutModule {}
