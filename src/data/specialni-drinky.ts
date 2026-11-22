// Koktejlový lístek (stránka /specialni-drinky/).
// Fotky jsou v src/assets/drinks/. Drink bez fotky se zobrazí jako řádek lístku,
// drink s `doporucujeme: true` (a fotkou) jako velká karta nahoře.
// Názvy a ceny odpovídají nápojovému lístku (src/data/napoje.ts) – při změně ceny upravte obojí.
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

  // Klasiky
  { name: 'Mojito', kategorie: 'klasiky', img: d06, tone: 'blue', ingredients: ['Bílý rum', 'Limeta', 'Máta', 'Třtinový cukr', 'Soda'], price: 135, doporucujeme: true },
  { name: 'Piña Colada', kategorie: 'klasiky', img: d02, tone: 'brown', ingredients: ['Bílý rum', 'Kokos', 'Ananas'], price: 135 },
  { name: 'Sex on the Beach', kategorie: 'klasiky', img: d09, tone: 'orange', ingredients: ['Vodka', 'Broskvový likér', 'Pomeranč', 'Brusinky'], price: 125 },
  { name: 'White Russian', kategorie: 'klasiky', ingredients: ['Vodka', 'Kávový likér', 'Smetana'], price: 90 },
  { name: 'Margarita', kategorie: 'klasiky', ingredients: ['Tequila', 'Triple sec', 'Limeta'], price: 170 },
  { name: 'Caipirinha', kategorie: 'klasiky', ingredients: ['Cachaça', 'Limeta', 'Třtinový cukr'], price: 95 },
  { name: 'Tequila Sunrise', kategorie: 'klasiky', img: d10, tone: 'orange', ingredients: ['Tequila', 'Pomerančový džus', 'Grenadina'], price: 125 },
  { name: 'Moscow Mule', kategorie: 'klasiky', ingredients: ['Vodka', 'Zázvorové pivo', 'Limeta'], price: 115 },

  // Long drinky
  { name: 'Sarti Spritz', kategorie: 'long', ingredients: ['Sarti Rosa', 'Prosecco', 'Soda', 'Limeta'], price: 135, novinka: true },
  { name: 'Aperol Spritz', kategorie: 'long', img: d03, tone: 'orange', ingredients: ['Aperol', 'Prosecco', 'Soda'], price: 135, doporucujeme: true },
  { name: 'Limoncello Spritz', kategorie: 'long', ingredients: ['Limoncello', 'Prosecco', 'Soda'], price: 135 },
  { name: 'Long Island Iced Tea', kategorie: 'long', img: d07, tone: 'green', ingredients: ['Vodka', 'Gin', 'Rum', 'Tequila', 'Triple sec', 'Cola'], price: 165 },
  { name: 'Gin & Tonic', kategorie: 'long', img: d08, tone: 'brown', ingredients: ['Gin', 'Tonic', 'Limeta'], price: 115 },
  { name: 'Cuba Libre', kategorie: 'long', img: d11, tone: 'blue', ingredients: ['Rum', 'Cola', 'Limeta'], price: 115 },
  { name: 'Dark & Stormy', kategorie: 'long', ingredients: ['Tmavý rum', 'Zázvorové pivo', 'Limeta'], price: 149 },

  // Shoty
  { name: 'B52', kategorie: 'shoty', ingredients: ['Kávový likér', 'Irský krémový likér', 'Pomerančový likér'], price: 95 },
  { name: 'JägerBomba', kategorie: 'shoty', ingredients: ['Jägermeister', 'Energetický nápoj'], price: 95 },

  // Nealko
  { name: 'Mojito Virgin', kategorie: 'nealko', ingredients: ['Limeta', 'Máta', 'Třtinový cukr', 'Soda'], price: 95 },
  { name: 'Bohemian Gin Pink & Tonic', kategorie: 'nealko', ingredients: ['Nealko gin', 'Tonic'], price: 95 },
];
