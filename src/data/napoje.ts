// Nápojový lístek. Na úvodní stránce se z každé kategorie ukáže prvních `nahled` položek,
// celý lístek je na stránce /napojovy-listek/.
// Položku přidáte nebo změníte úpravou jednoho řádku: { name, volume, price }.

export interface Item {
  name: string;
  volume?: string; // např. '0,5 l'
  price: number; // v Kč
  note?: string; // krátká poznámka pod názvem
}

export interface Category {
  id: string;
  title: string;
  icon: string;
  items: Item[];
}

export const nahled = 5;

export const napoje: Category[] = [
  {
    id: 'alkohol',
    title: 'Alkoholické nápoje',
    icon: '🍺',
    items: [
      { name: 'Vodka Finlandia', volume: '0,04 l', price: 65 },
      { name: "Jack Daniel's", volume: '0,04 l', price: 85 },
      { name: 'Captain Morgan', volume: '0,04 l', price: 70 },
      { name: 'Beefeater Gin', volume: '0,04 l', price: 75 },
      { name: 'Tullamore D.E.W.', volume: '0,04 l', price: 75 },
    ],
  },
  {
    id: 'nealko',
    title: 'Nealkoholické nápoje',
    icon: '🥤',
    items: [
      { name: 'Pepsi', volume: '0,33 l', price: 45 },
      { name: 'Kofola', volume: '0,5 l', price: 45 },
      { name: 'Red Bull', volume: '0,25 l', price: 65 },
      { name: 'Cappy', volume: '0,33 l', price: 45 },
      { name: 'Aquila neperlivá', volume: '0,5 l', price: 35 },
    ],
  },
  {
    id: 'drinky',
    title: 'Míchané drinky',
    icon: '🍹',
    items: [
      { name: 'Bouráček', price: 115, note: 'Drink, který jinde nedostanete' },
      { name: 'Bourák Mojito', price: 125 },
      { name: 'Sex on the Beach', price: 125 },
      { name: 'Long Island Iced Tea', price: 145 },
      { name: 'Cuba Libre', price: 105 },
      { name: 'Aperol Spritz', price: 125 },
    ],
  },
  {
    id: 'vino',
    title: 'Stáčené víno z vinařství Krist',
    icon: '🍷',
    items: [
      { name: 'Veltlínské zelené', price: 45 },
      { name: 'Ryzlink rýnský', price: 45 },
      { name: 'Svatovavřinecké', price: 45 },
      { name: 'Frankovka', price: 45 },
      { name: 'Růžové polosuché', price: 45 },
    ],
  },
];

// Jídelní lístek (TOM'S Pizza). Dokud je prázdný, na webu se nezobrazuje.
export const jidlo: Category[] = [];

export const kc = (price: number) => `${price.toLocaleString('cs-CZ')} Kč`;
