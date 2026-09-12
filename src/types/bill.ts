export type ThemeStyle = 'vintage' | 'blue-ink' | 'modern' | 'dark-kitchen' | 'golden-curry';

export interface TrackItem {
  id: string;
  name: string;
  singers: string;
  duration: string; // e.g. "04:55"
  price?: string;   // e.g. "4.55"
}

export interface BillData {
  movieTitle: string;
  musicDirector: string;
  director: string;
  studio: string;
  label: string;
  releaseDate: string;
  audioSpecs: string;
  hotelName: string;
  hotelSubtitle: string;
  billNo: string;
  tableNo: string;
  chefTitle: string;
  tracks: TrackItem[];
  taxPercent: number; // e.g., 5 for Swara GST
  tipAmount: number;
  customFooterNote: string;
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
  musicDirector: string;
  director: string;
  studio: string;
  label: string;
  releaseDate: string;
  audioSpecs: string;
  hotelName: string;
  hotelSubtitle: string;
  bgImage: string;
  tracks: TrackItem[];
  posterOpacity?: number;
}
