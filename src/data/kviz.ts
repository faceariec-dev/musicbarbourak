// Chytrý kvíz – hlavní akce Bouráku.
// `zacatek` doplňte (např. '19:00'); dokud je prázdný, web ukazuje jen „každé úterý“.
import plakat from '../assets/foto/quiz-poster.jpg';
import vitezove from '../assets/foto/quiz-winners.jpg';
import atmosfera from '../assets/foto/quiz-crowd.jpg';

export const kviz = {
  nazev: 'Chytrý kvíz',
  den: 2, // 0 = neděle … 2 = úterý
  kdy: 'Každé úterý',
  zacatek: '', // TODO: čas začátku
  motto: 'Kdo neví, ten se tváří chytře.',
  popis:
    'Pravidelný týmový kvíz v Bouráku. Sestavte partu, přijďte včas, objednejte si pivo a hrajte o slávu. Každý týden nové otázky a nové téma.',
  specialni: 'Kromě úterního kvízu chystáme s Chytrým kvízem i tematické speciály, třeba kvíz Hazbin Hotel. Termíny najdete v programu.',
  kroky: [
    { nadpis: 'Sestavte tým', text: 'Kamarádi, kolegové nebo rodina. Vymyslete jméno, které se bude dobře vyhlašovat.' },
    { nadpis: 'Přihlaste se', text: 'Přes QR kód na plakátu nebo na baru. Stůl si můžete předem zarezervovat telefonem.' },
    { nadpis: 'Hrajte o vítězství', text: 'Několik kol otázek, průběžné výsledky a vyhlášení na konci večera.' },
  ],
  plakat,
  vitezove,
  atmosfera,
};
