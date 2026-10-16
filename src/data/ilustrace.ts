// Ilustrační fotky z Pexels (zdroje v src/assets/ilustrace/ZDROJE.md).
// Až budou vlastní fotky z baru, stačí tady vyměnit import.
import disco from '../assets/ilustrace/disco-tanec.jpg';
import koncert from '../assets/ilustrace/koncert-v-baru.jpg';
import pizza from '../assets/ilustrace/pizza-z-pece.jpg';
import beerPong from '../assets/ilustrace/beer-pong.jpg';
import barPolice from '../assets/ilustrace/bar-police.jpg';
import premiove from '../assets/ilustrace/premiove-lahve.jpg';
import rum from '../assets/ilustrace/rum.jpg';
import oslava from '../assets/ilustrace/oslava-pripitek.jpg';
import firemni from '../assets/ilustrace/firemni-vecirek.jpg';
import pivo from '../assets/ilustrace/cepovani-piva.jpg';

export const ilustrace = { disco, koncert, pizza, beerPong, oslava, firemni, pivo, barPolice, premiove, rum };

// Mozaika „Večery v Bouráku“ na úvodní stránce. `velikost`: velka = 2×2, siroka = 2×1, mala = 1×1.
export const vecery: { title: string; kdy: string; text: string; foto: ImageMetadata; velikost: 'velka' | 'siroka' | 'mala'; odkaz?: string }[] = [
  { title: 'Disco 80ky & 90ky', kdy: 'Pátek a sobota do 5:00', text: 'Hity, u kterých zpívá celý bar, a parket až do rána.', foto: disco, velikost: 'velka', odkaz: '#program' },
  { title: 'Speciální akce', kdy: 'Sledujte program', text: 'Už u nás byl RumRock a RumFest od Alkoholog, stand-up comedy i koncerty.', foto: koncert, velikost: 'siroka', odkaz: '#program' },
  { title: "TOM'S Pizza", kdy: 'K pivu i ke kvízu', text: 'Poctivá pizza z pece, když večer začne hlad.', foto: pizza, velikost: 'mala' },
  { title: 'Beer pong, šipky, deskovky', kdy: 'Pro celou partu', text: 'A k tomu fotbálek a ping-pong.', foto: beerPong, velikost: 'mala' },
];

// Bohatý bar: tři hlavní důvody, proč k nám zajít na drink.
export const bar: { title: string; text: string; foto: ImageMetadata }[] = [
  { title: 'Krušovice na čepu', text: 'Točíme Krušovice a k tomu radler grep & pomelo.', foto: pivo },
  { title: 'Prémiové značky', text: 'Rumy, whisky, giny, tequily. Plná police a pořád je z čeho vybírat.', foto: premiove },
  { title: 'Koktejly a Bouráček', text: 'Klasiky, sezónní speciály a náš Bouráček, který jinde nedostanete.', foto: rum },
];
