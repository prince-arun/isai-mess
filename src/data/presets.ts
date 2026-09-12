import { Preset } from '../types/bill';

// Generate SVG posters as crisp data URIs for default presets
const createPosterSvg = (title: string, color1: string, color2: string, subtitle: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${color1}" />
        <stop offset="100%" stop-color="${color2}" />
      </linearGradient>
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise"/>
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.15 0"/>
      </filter>
    </defs>
    <rect width="600" height="800" fill="url(#g)" />
    <rect width="600" height="800" fill="#000" filter="url(#noise)" opacity="0.4"/>
    <circle cx="300" cy="340" r="180" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="8" />
    <circle cx="300" cy="340" r="140" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="4" stroke-dasharray="10 15" />
    <circle cx="300" cy="340" r="60" fill="rgba(0,0,0,0.5)" />
    <circle cx="300" cy="340" r="15" fill="#fff" />
    
    <text x="300" y="590" font-family="'Cinzel', 'Georgia', serif" font-size="44" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="4">${title.toUpperCase()}</text>
    <text x="300" y="635" font-family="'Outfit', sans-serif" font-size="20" fill="rgba(255,255,255,0.85)" text-anchor="middle" letter-spacing="2">${subtitle.toUpperCase()}</text>
    <line x1="150" y1="670" x2="450" y2="670" stroke="rgba(255,255,255,0.4)" stroke-width="2" />
    <text x="300" y="710" font-family="'Courier New', monospace" font-size="16" fill="rgba(255,255,255,0.7)" text-anchor="middle">ORIGINAL MOTION PICTURE SOUNDTRACK</text>
    <text x="300" y="740" font-family="'Courier New', monospace" font-size="14" fill="rgba(255,255,255,0.5)" text-anchor="middle">★ ISAI MESS SPECIAL AUDIO BILL ★</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const PRESETS: Preset[] = [
  {
    id: 'roja-1992',
    name: '🌹 Roja (1992)',
    movieTitle: 'Roja',
    musicDirector: 'A.R. Rahman',
    director: 'Mani Ratnam',
    studio: 'Panchathan Record Inn (Chennai)',
    label: 'Lahari Music',
    releaseDate: '15-AUG-1992',
    audioSpecs: 'Stereo 24-Bit / Remastered FLAC',
    hotelName: 'ரோஜா இசை உணவகம் (ROJA ISAI MESS)',
    hotelSubtitle: 'Panchathan Special Hot Melodies Since 1992',
    bgImage: createPosterSvg('Roja', '#8b0000', '#1a0000', 'Chef A.R. Rahman • Mani Ratnam'),
    posterOpacity: 0.12,
    tracks: [
      { id: 'r1', name: 'Chinna Chinna Aasai', singers: 'Minmini', duration: '04:55', price: '4.55' },
      { id: 'r2', name: 'Pudhu Vellai Mazhai', singers: 'Unni Menon, Sujatha', duration: '05:16', price: '5.16' },
      { id: 'r3', name: 'Kaadhal Rojave', singers: 'S.P. Balasubrahmanyam, Sujatha', duration: '05:03', price: '5.03' },
      { id: 'r4', name: 'Rukkumani Rukkumani', singers: 'S.P.B., K.S. Chithra', duration: '06:00', price: '6.00' },
      { id: 'r5', name: 'Tamizha Tamizha', singers: 'Hariharan', duration: '03:06', price: '3.06' },
    ]
  },
  {
    id: 'vaaranam-aayiram-2008',
    name: '🎸 Vaaranam Aayiram (2008)',
    movieTitle: 'Vaaranam Aayiram',
    musicDirector: 'Harris Jayaraj',
    director: 'Gautham Vasudev Menon',
    studio: 'Bliss Audio Labs (Chennai)',
    label: 'Sony Music India',
    releaseDate: '24-SEP-2008',
    audioSpecs: '5.1 Surround / High Definition',
    hotelName: 'வாரணம் ஆயிரம் சங்கீத பவன்',
    hotelSubtitle: 'Guitar Grill & Bass Sizzlers',
    bgImage: createPosterSvg('Vaaranam Aayiram', '#1e3a8a', '#0f172a', 'Chef Harris Jayaraj • Gautham Menon'),
    posterOpacity: 0.15,
    tracks: [
      { id: 'v1', name: 'Nenjukkul Peidhidum', singers: 'Hariharan, Devan, Prasanna', duration: '05:44', price: '5.44' },
      { id: 'v2', name: 'Mundhinam Parthene', singers: 'Naresh Iyer, Prashanthini', duration: '05:42', price: '5.42' },
      { id: 'v3', name: 'Adiye Kolluthe', singers: 'Benny Dayal, Krish, Shruti Haasan', duration: '05:15', price: '5.15' },
      { id: 'v4', name: 'Ava Enna', singers: 'Karthik, V.V. Prasanna', duration: '05:18', price: '5.18' },
      { id: 'v5', name: 'Annul Maale', singers: 'Sudha Ragunathan', duration: '05:05', price: '5.05' },
      { id: 'v6', name: 'Yethi Yethi', singers: 'Benny Dayal, Naresh Iyer, Solar Sai', duration: '04:53', price: '4.53' },
    ]
  },
  {
    id: 'paiyaa-2010',
    name: '🚗 Paiyaa (2010)',
    movieTitle: 'Paiyaa',
    musicDirector: 'Yuvan Shankar Raja',
    director: 'N. Lingusamy',
    studio: 'U1 Sound Station (Chennai)',
    label: 'Think Music',
    releaseDate: '12-FEB-2010',
    audioSpecs: 'U1 Highway Beat Master 320kbps',
    hotelName: 'பையா ஹைவே இசை மெஸ் (PAIYAA HIGHWAY MESS)',
    hotelSubtitle: 'U1 Special Highway Roadtrip Beats',
    bgImage: createPosterSvg('Paiyaa', '#b45309', '#451a03', 'Chef Yuvan Shankar Raja • Lingusamy'),
    posterOpacity: 0.14,
    tracks: [
      { id: 'p1', name: 'Thuli Thuli', singers: 'Haricharan, Tanvi Shah', duration: '04:47', price: '4.47' },
      { id: 'p2', name: 'En Kadhal Solla', singers: 'Yuvan Shankar Raja, Tanvi Shah', duration: '04:52', price: '4.52' },
      { id: 'p3', name: 'Adada Mazhaida', singers: 'Rahul Nambiar, Saindhavi', duration: '04:25', price: '4.25' },
      { id: 'p4', name: 'Poongatre Poongatre', singers: 'Benny Dayal', duration: '04:55', price: '4.55' },
      { id: 'p5', name: 'Yedho Ondru Ennai', singers: 'Yuvan Shankar Raja', duration: '03:48', price: '3.48' },
    ]
  },
  {
    id: 'master-2021',
    name: '🔥 Master (2021)',
    movieTitle: 'Master',
    musicDirector: 'Anirudh Ravichander',
    director: 'Lokesh Kanagaraj',
    studio: 'Alchemia Studios (Chennai)',
    label: 'Sony Music India',
    releaseDate: '15-MAR-2020',
    audioSpecs: 'Dolby Atmos 7.1 HD',
    hotelName: 'மாஸ்டர் ஹெவி பாஸ் உணவகம் (MASTER BASS MESS)',
    hotelSubtitle: 'Rockstar Anirudh Heavy Bass Special',
    bgImage: createPosterSvg('Master', '#7f1d1d', '#360707', 'Chef Anirudh • Lokesh Kanagaraj'),
    posterOpacity: 0.15,
    tracks: [
      { id: 'm1', name: 'Vaathi Coming', singers: 'Anirudh Ravichander, Gana Balachandar', duration: '03:50', price: '3.50' },
      { id: 'm2', name: 'Kutti Story', singers: 'Thalapathy Vijay, Anirudh', duration: '04:08', price: '4.08' },
      { id: 'm3', name: 'Vaathi Raid', singers: 'Arivu, Anirudh', duration: '03:25', price: '3.25' },
      { id: 'm4', name: 'Andha Kanni', singers: 'Anirudh Ravichander', duration: '02:18', price: '2.18' },
      { id: 'm5', name: 'Polakatum Para Para', singers: 'Santhosh Narayanan', duration: '03:37', price: '3.37' },
    ]
  },
  {
    id: 'thalapathi-1991',
    name: '👑 Thalapathi (1991)',
    movieTitle: 'Thalapathi',
    musicDirector: 'Ilaiyaraaja',
    director: 'Mani Ratnam',
    studio: 'Prasad Digital Studios (Chennai)',
    label: 'Echo Records',
    releaseDate: '05-NOV-1991',
    audioSpecs: 'Maestro Analog Master 24-Bit',
    hotelName: 'தளபதி ராஜங்க இசை மெஸ் (THALAPATHI MESS)',
    hotelSubtitle: 'Isaignani Maestro Heritage Feast',
    bgImage: createPosterSvg('Thalapathi', '#581c87', '#1e1b4b', 'Chef Ilaiyaraaja • Mani Ratnam'),
    posterOpacity: 0.15,
    tracks: [
      { id: 't1', name: 'Rakkamma Kaiya Thattu', singers: 'S.P. Balasubrahmanyam, Swarnalatha', duration: '07:10', price: '7.10' },
      { id: 't2', name: 'Sundari Kannal Oru Seathi', singers: 'S.P.B., K.S. Chithra', duration: '07:14', price: '7.14' },
      { id: 't3', name: 'Yamunai Aatrile', singers: 'Mitali Banerjee Bhawmik', duration: '03:15', price: '3.15' },
      { id: 't4', name: 'Kaattu Kuyilu', singers: 'S.P.B., K.J. Yesudas', duration: '05:31', price: '5.31' },
      { id: 't5', name: 'Chinnathayaval', singers: 'S. Janaki', duration: '04:42', price: '4.42' },
    ]
  },
  {
    id: 'moonu-2012',
    name: '💔 3 (Moonu - 2012)',
    movieTitle: '3 (Moonu)',
    musicDirector: 'Anirudh Ravichander',
    director: 'Aishwarya R. Dhanush',
    studio: 'Knack Studios (Chennai)',
    label: 'Sony Music India',
    releaseDate: '23-DEC-2011',
    audioSpecs: 'Viral Master Edition Stereo',
    hotelName: '3 மூணு காதல் இசை மெஸ் (3 MOONU MESS)',
    hotelSubtitle: 'Kolaveri Special Soup Boys Table',
    bgImage: createPosterSvg('3 Moonu', '#4c1d95', '#0f172a', 'Chef Anirudh • Dhanush'),
    posterOpacity: 0.14,
    tracks: [
      { id: 'mo1', name: 'Why This Kolaveri Di', singers: 'Dhanush', duration: '04:05', price: '4.05' },
      { id: 'mo2', name: 'Po Nee Po', singers: 'Mohit Chauhan, Anirudh', duration: '04:15', price: '4.15' },
      { id: 'mo3', name: 'Kannazhaga', singers: 'Dhanush, Shruti Haasan', duration: '03:25', price: '3.25' },
      { id: 'mo4', name: 'Nee Paartha Vizhigal', singers: 'Vijay Prakash, Shweta Mohan', duration: '04:12', price: '4.12' },
      { id: 'mo5', name: 'Aife', singers: 'Dhanush, Anirudh', duration: '03:10', price: '3.10' },
    ]
  }
];
