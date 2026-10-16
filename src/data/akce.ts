// Akce. Dvě skupiny:
// 1) `terminy` – konkrétní akce s datem. Zobrazí se nahoře, seřazené podle data,
//    a po skončení samy zmizí. Příklad:
//    { date: '2026-11-07', time: '20:00', title: 'Koncert: Kapela XY', desc: 'Vstupné 150 Kč.', tag: 'HUDBA', color: 'violet' },
// 2) `pravidelne` – co se u nás děje pořád (kvíz, disco…).

export type Color = 'orange' | 'pink' | 'violet' | 'yellow' | 'wine';

export interface Termin {
  date: string; // RRRR-MM-DD
  until?: string; // poslední den u vícedenní akce
  time?: string;
  title: string;
  desc: string;
  tag: string;
  color: Color;
}

export interface Pravidelna {
  title: string;
  when: string;
  desc: string;
  tag: string;
  color: Color;
}

export const terminy: Termin[] = [];

export const pravidelne: Pravidelna[] = [
  { title: 'Chytrý kvíz', when: 'Každé úterý', desc: 'Otestujte své znalosti a užijte si večer plný zábavy.', tag: 'KVÍZ', color: 'orange' },
  { title: 'Disco 80ky & 90ky', when: 'Každý pátek a sobotu', desc: 'Největší hity, tanec a atmosféra až do noci.', tag: 'DISCO', color: 'pink' },
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
