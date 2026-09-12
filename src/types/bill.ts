export type ThemeStyle =
  | 'minimal-modern'
  | 'authentic-thermal'
  | 'tea-kadai'
  | 'premium-cinematic';

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

// Convert amount to words for authentic thermal bills
export function amountInWords(amountStr: string): string {
  const num = parseFloat(amountStr);
  if (isNaN(num)) return '';

  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const rupees = Math.floor(num);
  const paise = Math.round((num - rupees) * 100);

  function convertTwoDigits(n: number): string {
    if (n < 20) return ones[n];
    return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '');
  }

  function convertNumber(n: number): string {
    if (n === 0) return 'Zero';
    if (n < 100) return convertTwoDigits(n);
    if (n < 1000) return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' and ' + convertTwoDigits(n % 100) : '');
    return n.toString();
  }

  const rupeeWords = convertNumber(rupees) + ' Rupees';
  const paiseWords = paise > 0 ? ' and ' + convertTwoDigits(paise) + ' Paise' : '';
  return `(${rupeeWords}${paiseWords} Only)`;
}
