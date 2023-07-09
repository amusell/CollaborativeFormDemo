import { IPageConfig } from '../app/common/models/page-config.interface';

export const environment: {
  production: boolean;
  apiUrl: string;
  pages: IPageConfig[];
} = {
  production: false,
  apiUrl: 'http://localhost:3000',
  pages: [
    {
      slug: 'dati-anagrafici',
      label: 'Dati Anagrafici',
      fields: [
        {
          name: 'firstName',
          label: 'Nome',
          placeholder: 'Inserisci il nome',
          type: 'text',
        },
        {
          name: 'lastName',
          label: 'Cognome',
          placeholder: 'Scrivi il cognome',
          type: 'text',
        },
        {
          name: 'birthDate',
          label: 'Data di nascita',
          placeholder: '__/__/____',
          type: 'date',
        },
      ],
    },
    {
      slug: 'occupazione',
      label: 'Occupazione',
      fields: [
        {
          name: 'jobType',
          label: 'Tipo di lavoro',
          placeholder: 'Seleziona un tipo di occupazione',
          options: [
            {
              value: 'soletrader',
              label: 'Libero professionista',
            },
            {
              value: 'employee',
              label: 'Impiegato',
            },
          ],
          type: 'select',
        },
      ],
    },
    {
      slug: 'residenza',
      label: 'Residenza',
      fields: [
        {
          name: 'address',
          label: 'Indirizzo',
          placeholder: 'Piazza / Via di residenza',
          type: 'text',
        },
        {
          name: 'civicNumber',
          label: 'N° Civico',
          placeholder: 'Numero civico o SNC se assente',
          type: 'text',
        },
        {
          name: 'city',
          label: 'Comune',
          placeholder: 'Comune di residenza',
          type: 'text',
        },
      ],
    },
  ],
};
