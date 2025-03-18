import { Clause } from '../app/ClausesMenu';

export const clausesList: Array<Omit<Clause, 'status'>> = [
  {
    id: '1',
    title: 'Apointment Of Executors and Trustees',
    asset: 'AppointmentOfExecutorsAndTrustees.docx',
  },
  {
    id: '2',
    title: 'Definitions of Relationships',
    asset: 'DefinitionsOfRelationships.docx',
  },
  {
    id: '3',
    title: 'Family Law Act',
    asset: 'FamilyLawAct.docx',
  },
  {
    id: '4',
    title: 'Revocation',
    asset: 'Revocation.docx',
  },
];
