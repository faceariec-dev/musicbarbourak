// Kontakty, otevírací doba a odkazy. Mění se tady, web si je bere odsud.

export const site = {
  name: 'Music Bar Bourák',
  claim: 'místo, kde žije hudba a zábava',

  street: 'Ke Kateřinkám 1411/17',
  district: 'Praha 4, Háje',
  city: 'Praha',
  zip: '149 00',

  phone: '+420 604 214 486',
  email: 'musicbarbourak@seznam.cz',

  // TODO ověřit přesné adresy profilů
  facebook: 'https://www.facebook.com/musicbarbourak',
  instagram: 'https://www.instagram.com/musicbarbourak',

  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Music Bar Bourák, Ke Kateřinkám 1411/17, Praha 4'),
};

export const tel = (phone: string) => 'tel:' + phone.replace(/\s/g, '');

// Otevírací doba: časy ve formátu HH:MM, víc úseků za den jde zapsat jako víc dvojic.
// Prázdné pole = zavřeno. Zavírání po půlnoci (např. 21:00–05:00) je v pořádku.
export const hours: { day: string; schema: string; open: [string, string][] }[] = [
  { day: 'Pondělí', schema: 'Monday', open: [] },
  { day: 'Úterý', schema: 'Tuesday', open: [['12:00', '21:00']] },
  { day: 'Středa', schema: 'Wednesday', open: [['12:00', '21:00']] },
  { day: 'Čtvrtek', schema: 'Thursday', open: [['12:00', '21:00']] },
  { day: 'Pátek', schema: 'Friday', open: [['12:00', '16:00'], ['21:00', '05:00']] },
  { day: 'Sobota', schema: 'Saturday', open: [['21:00', '05:00']] },
  { day: 'Neděle', schema: 'Sunday', open: [] },
];

// Soubory ke stažení (PDF). Soubor nahrajte do public/pdf/ a přidejte řádek, např.
// { title: 'Jídelní lístek', file: 'pdf/jidelni-listek.pdf' },
export const downloads: { title: string; file: string }[] = [];
