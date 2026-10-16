// Akce. Dvě skupiny:
// 1) `terminy` – konkrétní akce s datem. Zobrazí se nahoře, seřazené podle data,
//    a po skončení samy zmizí. Příklad:
//    { date: '2026-11-07', time: '20:00', title: 'Koncert: Kapela XY', desc: 'Vstupné 150 Kč.', tag: 'HUDBA', color: 'violet' },
// 2) `pravidelne` – co se u nás děje pořád (kvíz, disco…).

import kvizFoto from '../assets/foto/quiz-winners.jpg';
import kvizPlakat from '../assets/foto/quiz-poster.jpg';

export type Color = 'orange' | 'pink' | 'violet' | 'yellow' | 'wine';

export interface Termin {
  date: string; // RRRR-MM-DD
  until?: string; // poslední den u vícedenní akce
  time?: string;
  title: string;
  desc: string;
  tag: string;
  color: Color;
  plakat?: ImageMetadata; // plakát akce (na výšku), jinak barevná plocha s názvem
}

export interface Pravidelna {
  title: string;
  when: string;
  desc: string;
  tag: string;
  color: Color;
  dny?: number[]; // dny v týdnu pro „Týden v Bouráku“: 1 = pondělí … 6 = sobota, 0 = neděle
  kratce?: string; // krátký název do týdenního přehledu
  den?: string; // dny v pruhu „Každý týden“, např. 'Úterý'
  foto?: ImageMetadata;
  hlavni?: boolean; // velká karta vedle týdenního přehledu
}

export const terminy: Termin[] = [];

// Ukázkový plakát (ilustrační, z dřívějšího kvízu)
export const ukazkovyPlakat = kvizPlakat;

export const pravidelne: Pravidelna[] = [
  {
    title: 'Chytrý kvíz',
    when: 'Každé úterý',
    desc: 'Kdo neví, ten se tváří chytře. Přijďte s partou, soutěžíme o ceny a hlavně o slávu. Přihlášení přes QR kód na plakátu.',
    tag: 'KVÍZ',
    color: 'orange',
    dny: [2],
    den: 'Úterý',
    kratce: 'Chytrý kvíz',
    foto: kvizFoto,
    hlavni: true,
  },
  { title: 'Disco 80ky & 90ky', when: 'Každý pátek a sobotu', desc: 'Největší hity, tanec a parket až do 5:00 ráno.', tag: 'DISCO', color: 'pink', dny: [5, 6], den: 'Pátek a sobota', kratce: 'Disco do 5 ráno' },
  { title: 'Live koncerty', when: 'Pravidelně', desc: 'Živá hudba a koncertní večery.', tag: 'HUDBA', color: 'violet' },
  { title: 'Dětský den', when: 'Sezónně', desc: 'Tematické a speciální akce pro děti a rodiny.', tag: 'ZÁBAVA', color: 'yellow' },
  { title: 'Soukromé a tematické akce', when: 'Na míru', desc: 'Soukromé večírky, narozeninové oslavy či tematické večery.', tag: 'AKCE', color: 'wine' },
];

// Barvy plakátů a štítků
export const colors: Record<Color, { bg: string; tag: string; tagBg: string }> = {
  orange: { bg: 'linear-gradient(135deg,#d94a1f,#1c1c1c)', tag: '#B93A15', tagBg: '#fbe4db' },
  pink: { bg: 'linear-gradient(135deg,#c21e9c,#5b1e9c)', tag: '#c21e9c', tagBg: '#fbe1f3' },
  violet: { bg: 'linear-gradient(135deg,#3a1f66,#7a2ea0)', tag: '#7a2ea0', tagBg: '#efe1f5' },
  yellow: { bg: 'linear-gradient(135deg,#f0b429,#e8531d)', tag: '#c76a12', tagBg: '#fbecd6' },
  wine: { bg: 'linear-gradient(135deg,#7a1f2e,#2a2a2a)', tag: '#7a1f2e', tagBg: '#fbe1e6' },
};
