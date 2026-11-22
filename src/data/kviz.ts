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
  specialni: 'Kromě úterního kvízu u nás hostíme i tematické speciály Chytrého kvízu, třeba literární nebo Hazbin Hotel. Termíny a přihlášky najdete na',
  specialniOdkaz: 'https://www.kvizovespecialy.cz',
  prihlaska: 'https://chytrykviz.cz', // přihlášky týmů (stoly na kvíz se nerezervují)
  kroky: [
    { nadpis: 'Sestavte tým', text: 'Kamarádi, kolegové nebo rodina. Vymyslete jméno, které se bude dobře vyhlašovat.' },
    { nadpis: 'Přihlaste se', text: 'Tým se hlásí předem na chytrykviz.cz, odkaz najdete i v QR kódu na plakátu. Stoly na kvíz se nerezervují.' },
    { nadpis: 'Hrajte o vítězství', text: 'Několik kol otázek, průběžné výsledky a vyhlášení na konci večera.' },
  ],
  plakat,
  vitezove,
  atmosfera,
};
