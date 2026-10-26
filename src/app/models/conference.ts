export interface Conference {
  id: number;
  name: string;
  description: string;
  date: string;
  place: string;
  price: number;
  nbPlaces: number;
}
export type ConferenceDraft = Omit<Conference, 'id'>;
