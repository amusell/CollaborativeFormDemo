export interface IPageConfig {
  slug: string;
  label: string;
  fields: IFormFieldConfig[];
}

export interface IFormFieldConfig {
  name: string;
  label: string;
  type:
    | 'text'
    | 'number'
    | 'password'
    | 'email'
    | 'date'
    | 'textarea'
    | 'select';
  format?: 'currency' | 'percentage';
  options?: {
    value: unknown;
    label: string;
  }[];
  placeholder?: string;
}
