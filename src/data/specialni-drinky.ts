// Koktejlový lístek (stránka /specialni-drinky/).
// Fotky jsou v src/assets/drinks/. Drink bez fotky se zobrazí jako řádek lístku,
// drink s `doporucujeme: true` (a fotkou) jako velká karta nahoře.
// Zatím ilustrační obsah – nahradí se skutečnou koktejlovou kartou.
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
import shotyFoto from '../assets/foto/shots-tray.jpg';

type Tone = 'brown' | 'orange' | 'purple' | 'blue' | 'green';

export const kategorie = [
  { id: 'signature', title: 'Bourákovky', desc: 'Naše vlastní drinky, které jinde nedostanete.' },
  { id: 'klasiky', title: 'Klasiky', desc: 'Osvědčené koktejly, jak mají být.' },
  { id: 'long', title: 'Long drinky', desc: 'Velká sklenice, hodně ledu, na celý večer.' },
  { id: 'shoty', title: 'Shoty', desc: 'Rychle, do party, ideálně po tácech.' },
  { id: 'nealko', title: 'Nealko', desc: 'Stejná zábava, bez alkoholu.' },
] as const;

export type KategorieId = (typeof kategorie)[number]['id'];

export interface Drink {
  name: string;
  kategorie: KategorieId;
  ingredients: string[];
  price?: number;
  img?: ImageMetadata;
  tone?: Tone;
  doporucujeme?: boolean;
  novinka?: boolean;
  sezonni?: boolean;
}

export const signature = {
  name: 'Bouráček',
  img: bouracek,
  foto: shotyFoto, // skutečná fotka z baru
  tagline: 'Drink, který jinde nedostanete',
  price: 115,
};

export const drinky: Drink[] = [
  // Bourákovky
  { name: 'Sezónní speciál', kategorie: 'signature', img: d05, tone: 'green', ingredients: ['Podle aktuální nabídky baru'], sezonni: true, doporucujeme: true },
  { name: 'Bourák Mojito', kategorie: 'signature', ingredients: ['Bílý rum', 'Limeta', 'Máta', 'Třtinový cukr', 'Tajná přísada'], price: 125, novinka: true },

  // Klasiky
  { name: 'Espresso Martini', kategorie: 'klasiky', img: d10, tone: 'purple', ingredients: ['Vodka', 'Kávový likér', 'Espresso'], doporucujeme: true },
  { name: 'Piña Colada', kategorie: 'klasiky', img: d02, tone: 'brown', ingredients: ['Bílý rum', 'Kokos', 'Ananas'] },
  { name: 'Mojito', kategorie: 'klasiky', img: d06, tone: 'blue', ingredients: ['Bílý rum', 'Limeta', 'Máta', 'Třtinový cukr', 'Soda'], price: 125 },
  { name: 'Sex on the Beach', kategorie: 'klasiky', img: d09, tone: 'orange', ingredients: ['Vodka', 'Broskvový likér', 'Pomeranč', 'Brusinky'], price: 125 },
  { name: 'Margarita', kategorie: 'klasiky', ingredients: ['Tequila', 'Triple sec', 'Limeta'] },
  { name: 'Daiquiri', kategorie: 'klasiky', ingredients: ['Bílý rum', 'Limeta', 'Cukr'] },

  // Long drinky
  { name: 'Aperol Spritz', kategorie: 'long', img: d03, tone: 'orange', ingredients: ['Aperol', 'Prosecco', 'Soda'], price: 125, doporucujeme: true },
  { name: 'Long Island Iced Tea', kategorie: 'long', img: d07, tone: 'green', ingredients: ['Vodka', 'Gin', 'Rum', 'Tequila', 'Triple sec', 'Cola'], price: 145 },
  { name: 'Gin Tonic', kategorie: 'long', img: d08, tone: 'brown', ingredients: ['Gin', 'Tonic', 'Limeta', 'Jalovec'] },
  { name: 'Cuba Libre', kategorie: 'long', img: d11, tone: 'blue', ingredients: ['Rum', 'Cola', 'Limeta'], price: 105 },
  { name: 'Hugo', kategorie: 'long', ingredients: ['Prosecco', 'Bezový sirup', 'Máta', 'Soda'] },

  // Shoty
  { name: 'B-52', kategorie: 'shoty', ingredients: ['Kávový likér', 'Baileys', 'Grand Marnier'] },
  { name: 'Kamikaze', kategorie: 'shoty', ingredients: ['Vodka', 'Triple sec', 'Limeta'] },

  // Nealko
  { name: 'Virgin Mojito', kategorie: 'nealko', ingredients: ['Limeta', 'Máta', 'Třtinový cukr', 'Soda'] },
  { name: 'Ovocná limonáda', kategorie: 'nealko', ingredients: ['Podle sezóny'], sezonni: true },
];
