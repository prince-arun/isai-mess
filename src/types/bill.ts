export type ThemeStyle =
  | 'classic-hotel'
  | 'madurai-mess'
  | 'tea-kadai'
  | 'five-star'
  | 'night-biryani';

export interface TrackItem {
  id: string;
  name: string;
  singers: string;
  duration: string; // e.g. "05:15"
  price?: string;   // e.g. "5.15"
}

export interface BillData {
  movieTitle: string;
  tamilTitle?: string;
  musicDirector: string;
  director: string;
  studio: string;
  label: string;
  releaseDate: string;
  audioSpecs?: string;
  hotelName: string;
  hotelSubtitle: string;
  billNo: string;
  tableNo: string;
  chefTitle: string;
  tracks: TrackItem[];
  taxPercent: number; // e.g. 5 for Swara GST
  tipAmount: number;
  closingJoke: string;
  bgImage: string | null;
  posterOpacity: number;
  themeStyle: ThemeStyle;
  showTamilText: boolean;
  currencySymbol: string;
}

export interface Preset {
  id: string;
  name: string;
  movieTitle: string;
  tamilTitle: string;
  musicDirector: string;
  director: string;
  studio: string;
  label: string;
  releaseDate: string;
  hotelName: string;
  hotelSubtitle: string;
  closingJoke: string;
  bgImage: string;
  tracks: TrackItem[];
  posterOpacity?: number;
}
