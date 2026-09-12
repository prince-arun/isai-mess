import { Preset } from '../types/bill';

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
    <rect width="600" height="800" fill="#000" filter="url(#noise)" opacity="0.35"/>
    <circle cx="300" cy="320" r="170" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="6" />
    <circle cx="300" cy="320" r="130" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="3" stroke-dasharray="8 12" />
    <circle cx="300" cy="320" r="50" fill="rgba(0,0,0,0.5)" />
    <circle cx="300" cy="320" r="14" fill="#fff" />
    
    <text x="300" y="560" font-family="'Cinzel', 'Georgia', serif" font-size="42" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="3">${title.toUpperCase()}</text>
    <text x="300" y="615" font-family="'Outfit', sans-serif" font-size="20" fill="rgba(255,255,255,0.85)" text-anchor="middle" letter-spacing="2">${subtitle.toUpperCase()}</text>
    <line x1="150" y1="655" x2="450" y2="655" stroke="rgba(255,255,255,0.3)" stroke-width="2" />
    <text x="300" y="700" font-family="'Courier New', monospace" font-size="14" fill="rgba(255,255,255,0.7)" text-anchor="middle">BILLISAI • ORIGINAL AUDIO HOTEL BILL</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const PRESETS: Preset[] = [
  {
    id: 'vaaranam-aayiram-2008',
    name: '🔥 Vaaranam Aayiram',
    movieTitle: 'Vaaranam Aayiram',
    tamilTitle: 'Vaaranam Aayiram',
    musicDirector: 'Harris Jayaraj',
    director: 'Gautham Vasudev Menon',
    studio: 'Prasad Digital Studios (Chennai)',
    label: 'Sony Music India',
    releaseDate: '08-OCT-2008',
    hotelName: 'HOTEL VAARANAM AAYIRAM',
    hotelSubtitle: 'Harris Jayaraj Special Audio Feast',
    closingJoke: 'Payment accepted in feelings.',
    bgImage: createPosterSvg('Vaaranam Aayiram', '#1e3a8a', '#0f172a', 'Harris Jayaraj • Gautham Menon'),
    posterOpacity: 0.14,
    tracks: [
      { id: 'v1', name: 'Adiyae Kolluthey', singers: 'Benny Dayal, Krish, Shruti Haasan', duration: '05:15', price: '5.15' },
      { id: 'v2', name: 'Nenjukkul Peidhidum', singers: 'Hariharan, Devan, Prasanna', duration: '06:09', price: '6.09' },
      { id: 'v3', name: 'Yethi Yethi', singers: 'Benny Dayal, Naresh Iyer, Solar Sai', duration: '04:53', price: '4.53' },
      { id: 'v4', name: 'Mundhinam Parthene', singers: 'Naresh Iyer, Prashanthini', duration: '05:41', price: '5.41' },
      { id: 'v5', name: 'Oh! Shanthi Shanthi', singers: 'Clinton Cerejo, S.P.B. Charan', duration: '03:03', price: '3.03' },
      { id: 'v6', name: 'Ava Enna', singers: 'Karthik, V.V. Prasanna', duration: '05:18', price: '5.18' },
      { id: 'v7', name: 'Annul Maale', singers: 'Sudha Ragunathan', duration: '05:05', price: '5.05' },
    ]
  },
  {
    id: 'roja-1992',
    name: '❤️ Roja',
    movieTitle: 'Roja',
    tamilTitle: 'Roja',
    musicDirector: 'A.R. Rahman',
    director: 'Mani Ratnam',
    studio: 'Panchathan Record Inn (Chennai)',
    label: 'Lahari Music',
    releaseDate: '15-AUG-1992',
    hotelName: 'HOTEL ROJA',
    hotelSubtitle: 'A.R. Rahman Special Audio Feast',
    closingJoke: 'You owe us 35 minutes of your life.',
    bgImage: createPosterSvg('Roja', '#8b0000', '#1a0000', 'A.R. Rahman • Mani Ratnam'),
    posterOpacity: 0.12,
    tracks: [
      { id: 'r1', name: 'Chinna Chinna Asai', singers: 'Minmini, A.R. Rahman', duration: '04:55', price: '4.55' },
      { id: 'r2', name: 'Pudhu Vellai Mazhai', singers: 'Unni Menon, Sujatha', duration: '05:16', price: '5.16' },
      { id: 'r3', name: 'Kaadhal Rojave', singers: 'S.P. Balasubrahmanyam, Sujatha', duration: '05:03', price: '5.03' },
      { id: 'r4', name: 'Rukkumani Rukkumani', singers: 'S.P.B., K.S. Chithra', duration: '06:00', price: '6.00' },
      { id: 'r5', name: 'Tamizha Tamizha', singers: 'Hariharan', duration: '03:06', price: '3.06' },
    ]
  },
  {
    id: 'alaipayuthey-2000',
    name: '☕ Alaipayuthey',
    movieTitle: 'Alaipayuthey',
    tamilTitle: 'Alaipayuthey',
    musicDirector: 'A.R. Rahman',
    director: 'Mani Ratnam',
    studio: 'Panchathan Record Inn (Chennai)',
    label: 'Saregama India',
    releaseDate: '14-APR-2000',
    hotelName: 'HOTEL ALAIPAYUTHEY',
    hotelSubtitle: 'A.R. Rahman Special Audio Feast',
    closingJoke: 'No refunds on replay value.',
    bgImage: createPosterSvg('Alaipayuthey', '#0d9488', '#134e4a', 'A.R. Rahman • Mani Ratnam'),
    posterOpacity: 0.14,
    tracks: [
      { id: 'a1', name: 'Pachai Nirame', singers: 'Hariharan, Clinton Cerejo', duration: '05:58', price: '5.58' },
      { id: 'a2', name: 'Snehithane Snehithane', singers: 'Sadhana Sargam, Srinivas', duration: '06:05', price: '6.05' },
      { id: 'a3', name: 'Kadhal Sadugudu', singers: 'S.P.B. Charan', duration: '04:35', price: '4.35' },
      { id: 'a4', name: 'Evano Oruvan', singers: 'Swarnalatha', duration: '05:56', price: '5.56' },
      { id: 'a5', name: 'Endhendrum Punnagai', singers: 'Clinton Cerejo, Srinivas, Shankar Mahadevan', duration: '03:57', price: '3.57' },
      { id: 'a6', name: 'Alaipayuthey Kanna', singers: 'Kalyani Menon, Harini', duration: '03:41', price: '3.41' },
    ]
  },
  {
    id: 'thalapathi-1991',
    name: '👑 Thalapathi',
    movieTitle: 'Thalapathi',
    tamilTitle: 'Thalapathi',
    musicDirector: 'Ilaiyaraaja',
    director: 'Mani Ratnam',
    studio: 'Prasad Digital Studios (Chennai)',
    label: 'Echo Records',
    releaseDate: '05-NOV-1991',
    hotelName: 'HOTEL THALAPATHI',
    hotelSubtitle: 'Ilaiyaraaja Heritage Audio Feast',
    closingJoke: 'Thank you. Please replay again.',
    bgImage: createPosterSvg('Thalapathi', '#581c87', '#1e1b4b', 'Ilaiyaraaja • Mani Ratnam'),
    posterOpacity: 0.15,
    tracks: [
      { id: 't1', name: 'Rakkamma Kaiya Thattu', singers: 'S.P.B., Swarnalatha', duration: '07:10', price: '7.10' },
      { id: 't2', name: 'Sundari Kannal Oru Seathi', singers: 'S.P.B., K.S. Chithra', duration: '07:14', price: '7.14' },
      { id: 't3', name: 'Yamunai Aatrile', singers: 'Mitali Banerjee Bhawmik', duration: '03:15', price: '3.15' },
      { id: 't4', name: 'Kaattu Kuyilu', singers: 'S.P.B., K.J. Yesudas', duration: '05:31', price: '5.31' },
      { id: 't5', name: 'Chinnathayaval', singers: 'S. Janaki', duration: '04:42', price: '4.42' },
    ]
  },
  {
    id: '96-movie-2018',
    name: '🌙 96',
    movieTitle: '96',
    tamilTitle: '96',
    musicDirector: 'Govind Vasantha',
    director: 'C. Prem Kumar',
    studio: '20db Sound Studios (Chennai)',
    label: 'Think Music',
    releaseDate: '24-AUG-2018',
    hotelName: 'HOTEL 96',
    hotelSubtitle: 'Govind Vasantha Special Audio Feast',
    closingJoke: 'Calories burned while crying: 0 kcal.',
    bgImage: createPosterSvg('96', '#ca8a04', '#422006', 'Govind Vasantha • Prem Kumar'),
    posterOpacity: 0.14,
    tracks: [
      { id: 'n1', name: 'The Life of Ram', singers: 'Pradeep Kumar', duration: '05:46', price: '5.46' },
      { id: 'n2', name: 'Kaathalae Kaathalae', singers: 'Chinmayi, Govind Vasantha', duration: '03:13', price: '3.13' },
      { id: 'n3', name: 'Thaabangale', singers: 'Pradeep Kumar, Chinmayi', duration: '03:58', price: '3.58' },
      { id: 'n4', name: 'Vasantha Kaalangal', singers: 'Chinmayi', duration: '04:56', price: '4.56' },
      { id: 'n5', name: 'Iravingu Theevai', singers: 'Pradeep Kumar, Chinmayi', duration: '03:41', price: '3.41' },
      { id: 'n6', name: 'Anthaathi', singers: 'Chinmayi, Govind Vasantha, Nassar', duration: '07:15', price: '7.15' },
    ]
  },
  {
    id: 'ghilli-2004',
    name: '⚡ Ghilli',
    movieTitle: 'Ghilli',
    tamilTitle: 'Ghilli',
    musicDirector: 'Vidyasagar',
    director: 'Dharani',
    studio: 'Viji Sound Studios (Chennai)',
    label: 'Five Star Audio',
    releaseDate: '17-APR-2004',
    hotelName: 'HOTEL GHILLI',
    hotelSubtitle: 'Vidyasagar Special High Energy Feast',
    closingJoke: 'Melody served hot & spicy.',
    bgImage: createPosterSvg('Ghilli', '#ea580c', '#7c2d12', 'Vidyasagar • Dharani'),
    posterOpacity: 0.15,
    tracks: [
      { id: 'g1', name: 'Appadi Podu', singers: 'KK, Anuradha Sriram', duration: '05:52', price: '5.52' },
      { id: 'g2', name: 'Arjunar Villu', singers: 'Sukhwinder Singh, Manikka Vinayagam', duration: '04:27', price: '4.27' },
      { id: 'g3', name: 'Sha La La', singers: 'Sunidhi Chauhan', duration: '04:30', price: '4.30' },
      { id: 'g4', name: 'Kokkarakko', singers: 'Udit Narayan, Sujatha', duration: '05:00', price: '5.00' },
      { id: 'g5', name: 'Soora Thenga', singers: 'Tippu', duration: '04:03', price: '4.03' },
    ]
  },
];
