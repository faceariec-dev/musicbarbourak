// Speciální drinky (stránka /specialni-drinky/). Fotky jsou v src/assets/drinks/.
import bouracek from '../assets/drinks/bouracek-signature.webp';
import d02 from '../assets/drinks/drink-02.webp';
import d03 from '../assets/drinks/drink-03.webp';
import d05 from '../assets/drinks/drink-05.webp';
import d06 from '../assets/drinks/drink-06.webp';
import d07 from '../assets/drinks/drink-07.webp';
import d08 from '../assets/drinks/drink-08.webp';
import d09 from '../assets/drinks/drink-09.webp';
import d10 from '../assets/drinks/drink-10.webp';
import d11 from '../assets/drinks/drink-11.webp';

type Tone = 'brown' | 'orange' | 'purple' | 'blue' | 'green';

export interface Drink {
  name: string;
  img: ImageMetadata;
  ingredients: string[];
  tone?: Tone;
  price?: number;
  tagline?: string;
}

export const signature: Drink = {
  name: 'Bouráček',
  img: bouracek,
  tagline: 'Drink, který jinde nedostanete',
  price: 115,
  ingredients: [],
};

export const drinky: Drink[] = [
  { name: 'Piña Colada', img: d02, tone: 'brown', ingredients: ['Bílý rum', 'Kokos', 'Ananas'] },
  { name: 'Aperol Spritz', img: d03, tone: 'orange', ingredients: ['Aperol', 'Prosecco', 'Soda'] },
  { name: 'Sezónní speciál', img: d05, tone: 'purple', ingredients: ['Podle aktuální nabídky baru'] },
  { name: 'Mojito', img: d06, tone: 'blue', ingredients: ['Bílý rum', 'Limeta', 'Máta', 'Třtinový cukr', 'Soda'] },
  { name: 'Long Island Iced Tea', img: d07, tone: 'green', ingredients: ['Vodka', 'Gin', 'Rum', 'Tequila', 'Triple sec', 'Cola'] },
  { name: 'Gin Tonic', img: d08, tone: 'brown', ingredients: ['Gin', 'Tonic', 'Limeta', 'Jalovec'] },
  { name: 'Sex on the Beach', img: d09, tone: 'orange', ingredients: ['Vodka', 'Broskvový likér', 'Pomeranč', 'Brusinky'] },
  { name: 'Espresso Martini', img: d10, tone: 'purple', ingredients: ['Vodka', 'Kávový likér', 'Espresso'] },
  { name: 'Cuba Libre', img: d11, tone: 'blue', ingredients: ['Rum', 'Cola', 'Limeta'] },
];
