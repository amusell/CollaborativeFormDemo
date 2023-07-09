import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Host, Input, Self } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { IPageConfig } from '../../common/models/page-config.interface';

@Component({
  standalone: true,
  selector: 'dyn-form',
  templateUrl: './dyn-form.component.html',
  styleUrls: ['./dyn-form.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class DynFormComponent {
  private formConfig: IPageConfig | null = null;
  public form: FormGroup | null = null;
  @Input()
  public set config(cfg: IPageConfig | null | undefined) {
    this.initForm(cfg);
    this.formConfig = cfg || null;
  }
  public get config(): IPageConfig | null {
    return this.formConfig;
  }

  constructor(
    private readonly controlContainer: ControlContainer,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  private initForm(cfg: IPageConfig | null | undefined) {
    if (!cfg || !this.controlContainer?.control) {
      this.form = null;
      return;
    }

    this.form = this.controlContainer.control as FormGroup;

    Object.keys(this.form!.controls).forEach((controlName) => {
      this.form!.removeControl(controlName);
    });
    cfg!.fields.forEach((field) => {
      this.form?.addControl(field.name, new FormControl(null));
    });
  }
}
