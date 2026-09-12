export const CLOSING_JOKES = [
  'Payment accepted in feelings.',
  'No refunds on replay value.',
  'You owe us 35 minutes of your life.',
  'Melody served hot & spicy.',
  'Thank you. Please replay again.',
  'Calories burned while crying: 0 kcal.',
  'Tip the composer with loop plays on Spotify.',
  'Swara GST included for extra melody.',
  'Chef recommends listening on repeat with headphones.',
];

export function getRandomJoke(): string {
  const index = Math.floor(Math.random() * CLOSING_JOKES.length);
  return CLOSING_JOKES[index];
}
