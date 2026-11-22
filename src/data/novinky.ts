// Novinky na baru (nový drink, nový alkohol). Ukážou se v úvodu webu,
// v běžícím pruhu a jako pruh „Novinka na baru“ v sekci Bohatý bar.
// `do` = poslední den, kdy se novinka ukazuje (potom sama zmizí). `od` = první den.
// Fotku dejte do src/assets/novinky/ (ideálně čtverec).
// Reklamy dodavatelů a krátké akce (2+1, „v pátek za 39 Kč“) patří jen na sociální sítě.
import sartiSpritz from '../assets/novinky/sarti-spritz.jpg';

export interface Novinka {
  nazev: string;
  popis: string;
  cena?: number; // v Kč
  foto?: ImageMetadata;
  od?: string; // RRRR-MM-DD
  do?: string; // RRRR-MM-DD
}

export const novinky: Novinka[] = [
  {
    nazev: 'Sarti Spritz',
    popis: 'Sarti Rosa, prosecco, soda a plátek limetky. Exotický a osvěžující.',
    cena: 135,
    foto: sartiSpritz,
    od: '2026-11-22',
    do: '2026-12-31',
  },
];

export const aktualni = (dnes: string) =>
  novinky.filter((n) => (!n.od || n.od <= dnes) && (!n.do || n.do >= dnes));
