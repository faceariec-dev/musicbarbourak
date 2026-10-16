// Ilustrační fotky z Pexels (zdroje v src/assets/ilustrace/ZDROJE.md).
// Až budou vlastní fotky z baru, stačí tady vyměnit import.
import disco from '../assets/ilustrace/disco-tanec.jpg';
import koncert from '../assets/ilustrace/koncert-v-baru.jpg';
import pizza from '../assets/ilustrace/pizza-z-pece.jpg';
import sipky from '../assets/ilustrace/sipky.jpg';
import oslava from '../assets/ilustrace/oslava-pripitek.jpg';
import firemni from '../assets/ilustrace/firemni-vecirek.jpg';
import pivo from '../assets/ilustrace/cepovani-piva.jpg';

export const ilustrace = { disco, koncert, pizza, sipky, oslava, firemni, pivo };

// Mozaika „Večery v Bouráku“ na úvodní stránce. `velikost`: velka = 2×2, siroka = 2×1, mala = 1×1.
export const vecery: { title: string; kdy: string; text: string; foto: ImageMetadata; velikost: 'velka' | 'siroka' | 'mala'; odkaz?: string }[] = [
  { title: 'Disco 80ky & 90ky', kdy: 'Pátek a sobota do 5:00', text: 'Hity, u kterých zpívá celý bar, a parket až do rána.', foto: disco, velikost: 'velka', odkaz: '#program' },
  { title: 'Live koncerty', kdy: 'Pravidelně', text: 'Kapely a koncertní večery přímo v baru.', foto: koncert, velikost: 'siroka', odkaz: '#program' },
  { title: "TOM'S Pizza", kdy: 'K pivu i ke kvízu', text: 'Poctivá pizza z pece, když večer začne hlad.', foto: pizza, velikost: 'mala' },
  { title: 'Šipky, fotbálek, ping-pong', kdy: 'Pro celou partu', text: 'Hry mezi koly kvízu i o víkendu.', foto: sipky, velikost: 'mala' },
];
