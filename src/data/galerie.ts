// Nástěnka „Ze života Bouráku“ – skutečné fotky z baru jako polaroidy.
// Přidejte fotku do src/assets/foto/ a řádek sem. `popisek` je ručně psaný text pod fotkou.
import kviz from '../assets/foto/quiz-crowd.jpg';
import vitezove from '../assets/foto/quiz-winners.jpg';
import bar from '../assets/foto/bar-counter.jpg';
import shoty from '../assets/foto/shots-tray.jpg';
import plakat from '../assets/foto/quiz-poster.jpg';
import detskyDen from '../assets/foto/detsky-den.jpg';
import rhum from '../assets/foto/rhum-jm.jpg';
import krusovice from '../assets/foto/krusovice-na-jedno.jpg';

export const galerie: { foto: ImageMetadata; alt: string; popisek: string; pomer?: string }[] = [
  { foto: kviz, alt: 'Soutěžící při Chytrém kvízu', popisek: 'Úterý = přemýšlení', pomer: '4 / 5' },
  { foto: vitezove, alt: 'Vítězné týmy kvízu', popisek: 'Vítězové kvízu 🏆', pomer: '4 / 3' },
  { foto: shoty, alt: 'Tác Bouráčků', popisek: 'Tác Bouráčků, prosím!', pomer: '1' },
  { foto: bar, alt: 'Hosté u baru', popisek: 'U baru se nestojí sám', pomer: '4 / 5' },
  { foto: plakat, alt: 'Plakát Chytrého kvízu', popisek: 'Error All Stars', pomer: '4 / 5' },
  { foto: detskyDen, alt: 'Dětský den v Bouráku: téměř 300 zmrzlin a přes 100 dárečků', popisek: 'Dětský den se vydařil!', pomer: '4 / 5' },
  { foto: rhum, alt: 'Rhum J.M Terroir Volcanique na baru', popisek: 'Rhum J.M z naší nabídky', pomer: '4 / 5' },
  { foto: krusovice, alt: 'Krušovice Bohém na čepu', popisek: 'Stav se na jedno', pomer: '4 / 5' },
];
