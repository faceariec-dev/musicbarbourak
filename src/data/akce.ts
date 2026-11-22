// Akce. Dvě skupiny:
// 1) `terminy` – konkrétní akce s datem. Zobrazí se nahoře, seřazené podle data,
//    a po skončení samy zmizí. Příklad:
//    { date: '2026-11-07', time: '19:00', title: 'Jen Blbni Rock', desc: 'Cover verze známých rockových skladeb.',
//      tag: 'KONCERT', color: 'violet', vstupne: '200 Kč', plakat: jenBlbni },
//    Plakát (na výšku) dejte do src/assets/akce/ a nahoře ho importujte, např.
//    import jenBlbni from '../assets/akce/jen-blbni-rock.jpg';
//    Nejbližší akce s plakátem se ukáže v úvodu webu a jako velká karta v Programu.
//    Akce s tag: 'KVÍZ' (speciální kvízy) se neukazují v úvodu ani v Programu, ale v sekci
//    Chytrý kvíz v bloku „Máme pro vás speciály“ (leták, datum, tlačítko na přihlášku).
//    U kvízových speciálů přidejte odkaz na přihlášky:
//      odkaz: 'https://www.kvizovespecialy.cz', odkazText: 'Přihlásit tým'
//    Koncerty mají `archiv: true` – po skončení se přesunou do archivu „Už u nás hráli“.
//    Ostatní akce (kvízy…) po skončení prostě zmizí. Odehrané akce ze seznamu nemažte.
// 2) `pravidelne` – co se u nás děje pořád (kvíz, disco…).

import kvizFoto from '../assets/foto/quiz-winners.jpg';
import kvizPlakat from '../assets/foto/quiz-poster.jpg';
import jenBlbni from '../assets/akce/jen-blbni-rock-2026-11-21.jpg';
import kvizMarvel from '../assets/akce/kviz-marvel-2026-11.jpg';
import kvizPohadkovy from '../assets/akce/kviz-pohadkovy-2026-12-13.jpg';
import kvizRetro from '../assets/akce/kviz-retro-2026-10.jpg';
import kvizCestovatelsky from '../assets/akce/kviz-cestovatelsky-2026-04-19.jpg';
import kvizHerni from '../assets/akce/kviz-herni-2026-03-29.jpg';
import bluesrock from '../assets/akce/bluesrock-cannonade-2026-04-10.jpg';

export type Color = 'orange' | 'pink' | 'violet' | 'yellow' | 'wine';

export interface Termin {
  date: string; // RRRR-MM-DD
  until?: string; // poslední den u vícedenní akce
  time?: string;
  title: string;
  desc: string;
  tag: string;
  color: Color;
  plakat?: ImageMetadata; // plakát akce (na výšku)
  vstupne?: string; // např. '200 Kč' nebo 'zdarma'
  odkaz?: string; // přihláška, vstupenky…
  odkazText?: string; // text tlačítka, výchozí „Více informací“
  archiv?: boolean; // koncert: tlačítko Rezervovat stůl a po skončení přesunout do archivu „Už u nás hráli“ (koncerty); bez toho akce po skončení zmizí
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

export const terminy: Termin[] = [
  {
    date: '2026-11-25',
    title: 'Chytrý kvíz: Marvel speciál',
    desc: 'Tematický speciál Chytrého kvízu ze světa Marvelu. Sestavte tým a přihlaste se předem.',
    tag: 'KVÍZ',
    color: 'orange',
    plakat: kvizMarvel,
    odkaz: 'https://chytrykviz.cz/specialy/marvel-special-25-11',
    odkazText: 'Přihlásit tým',
  },
  {
    date: '2026-11-29',
    title: 'Chytrý kvíz: Marvel speciál',
    desc: 'Tematický speciál Chytrého kvízu ze světa Marvelu. Sestavte tým a přihlaste se předem.',
    tag: 'KVÍZ',
    color: 'orange',
    plakat: kvizMarvel,
    odkaz: 'https://chytrykviz.cz/specialy/marvel-special-29-11',
    odkazText: 'Přihlásit tým',
  },
  {
    date: '2026-12-13',
    title: 'Chytrý kvíz: Pohádkový speciál',
    desc: 'Pohádkový speciál Chytrého kvízu, od českých pohádek po Disney a Pixar. Sestavte tým a přihlaste se předem.',
    tag: 'KVÍZ',
    color: 'orange',
    plakat: kvizPohadkovy,
    odkaz: 'https://chytrykviz.cz/rezervace/77758',
    odkazText: 'Přihlásit tým',
  },
  {
    date: '2026-11-21',
    time: '19:00',
    title: 'Jen Blbni Rock',
    desc: 'Cover verze známých českých a zahraničních rockových skladeb.',
    tag: 'KONCERT',
    color: 'violet',
    vstupne: '200 Kč',
    plakat: jenBlbni,
    archiv: true,
  },
  // ---- odehrané (zůstávají kvůli archivu koncertů a přehledu proběhlých speciálů) ----
  {
    date: '2026-10-07',
    title: 'Chytrý kvíz: Retro kvíz',
    desc: 'Retro speciál Chytrého kvízu: tamagoči, Nokia, Bravo a 90. léta.',
    tag: 'KVÍZ',
    color: 'orange',
    plakat: kvizRetro,
  },
  {
    date: '2026-10-11',
    title: 'Chytrý kvíz: Retro kvíz',
    desc: 'Retro speciál Chytrého kvízu: tamagoči, Nokia, Bravo a 90. léta.',
    tag: 'KVÍZ',
    color: 'orange',
    plakat: kvizRetro,
  },
  {
    date: '2026-04-19',
    time: '18:00',
    title: 'Chytrý kvíz: Cestovatelský speciál',
    desc: '55 otázek ze světa cestování, nejlepší tým získá odměnu z podniku.',
    tag: 'KVÍZ',
    color: 'orange',
    plakat: kvizCestovatelsky,
  },
  {
    date: '2026-03-29',
    time: '18:00',
    title: 'Chytrý kvíz: Herní speciál',
    desc: '55 otázek ze světa her, nejlepší tým získá odměnu z podniku.',
    tag: 'KVÍZ',
    color: 'orange',
    plakat: kvizHerni,
  },
  {
    date: '2026-04-10',
    time: '19:00',
    title: 'Bluesrock Cannonade',
    desc: 'London rocker Buzz and friends.',
    tag: 'KONCERT',
    color: 'violet',
    vstupne: 'dobrovolné',
    plakat: bluesrock,
    archiv: true,
  },
];

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
  { title: 'Live koncerty', when: 'Pravidelně', desc: 'Živá hudba a koncertní večery, třeba rockové covery s kapelou Jen Blbni Rock.', tag: 'HUDBA', color: 'violet' },
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
