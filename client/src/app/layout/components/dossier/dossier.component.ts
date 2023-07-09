import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  templateUrl: './dossier.component.html',
  styleUrls: ['./dossier.component.scss'],
})
export class DossierComponent {
  public readonly menuItems = environment.pages.map(({ label, slug }) => ({
    label,
    slug,
  }));
}
