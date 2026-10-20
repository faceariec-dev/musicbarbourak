// Nápojový lístek podle papírového lístku (smluvní ceny platné od 1. 1. 2026). Na úvodní stránce se z každé kategorie ukáže prvních `nahled` položek,
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
  naUvod?: boolean; // ukázat ukázku kategorie na úvodní stránce
}

export const nahled = 5;

export const napoje: Category[] = [
  {
    id: "cepovane-pivo",
    title: "Čepované pivo",
    icon: "🍺",
    naUvod: true,
    items: [
      { name: "Krušovice Bohém", volume: "0,3 l", price: 33 },
      { name: "Krušovice Bohém", volume: "0,5 l", price: 53 },
      { name: "Pivní speciál", volume: "0,4 l", price: 53 },
      { name: "Strongbow Cider", volume: "0,4 l", price: 53 },
      { name: "Zlatopramen Radler nealko", volume: "0,5 l", price: 49 },
      { name: "Zlatopramen Radler nealko", volume: "0,3 l", price: 39 },
    ],
  },
  {
    id: "lahvove-pivo",
    title: "Lahvové pivo",
    icon: "🍾",
    items: [
      { name: "Frisco", volume: "0,33 l", price: 55 },
      { name: "Krušovice nealko", volume: "0,5 l", price: 45 },
      { name: "Desperados", volume: "0,33 l", price: 75 },
    ],
  },
  {
    id: "michane",
    title: "Míchané nápoje",
    icon: "🍹",
    naUvod: true,
    items: [
      { name: "Blue Bitch", price: 75 },
      { name: "Blue Lagoon", price: 115 },
      { name: "B52", price: 95 },
      { name: "Bourák", price: 55 },
      { name: "Captain Morgan & Cola", price: 95 },
      { name: "Cuba Libre", price: 115 },
      { name: "Caipirinha", price: 95 },
      { name: "Dark & Stormy", price: 149 },
      { name: "Fernet Stock Bavorák", price: 95 },
      { name: "Fernet Spritz", price: 95 },
      { name: "Fizzy Gin", price: 115 },
      { name: "Fizzy Vodka", price: 115 },
      { name: "Gin & Tonic", price: 115 },
      { name: "Gin Pink & Tonic", price: 120 },
      { name: "JägerBomba", price: 95 },
      { name: "Kozičky", price: 89 },
      { name: "Long Island Iced Tea", price: 165 },
      { name: "Margarita", price: 170 },
      { name: "Fruit Margarita Frozen", price: 185 },
      { name: "Mojito", price: 135 },
      { name: "Moscow Mule", price: 115 },
      { name: "Mimosa", price: 105 },
      { name: "Piña Colada", price: 135 },
      { name: "Piña Colada Kraken", price: 160 },
      { name: "Skinny Bitch", price: 85 },
      { name: "Sex on the Beach", price: 125 },
      { name: "Tequila Sunrise", price: 125 },
      { name: "Vesper", price: 190 },
      { name: "White Russian", price: 90 },
      { name: "Aperol Spritz", price: 135 },
      { name: "Limoncello Spritz", price: 135 },
      { name: "Sarti Spritz", price: 135 },
    ],
  },
  {
    id: "mocktail",
    title: "Mocktail",
    icon: "🍋",
    items: [
      { name: "Mojito Virgin", price: 95 },
      { name: "Bohemian Gin Pink & Tonic", price: 95 },
    ],
  },
  {
    id: "rum",
    title: "Rum / tuzemák / elixír / spiced",
    icon: "🥃",
    naUvod: true,
    items: [
      { name: "Božkov Originál (tuzemský)", volume: "0,04 l", price: 50 },
      { name: "Božkov Republica Exclusive", volume: "0,04 l", price: 60 },
      { name: "Captain Morgan Spiced Gold", volume: "0,04 l", price: 65 },
      { name: "Cortez Blanco", volume: "0,04 l", price: 65 },
      { name: "Havana Club Añejo 3 Años", volume: "0,04 l", price: 75 },
      { name: "Cachaça Ouro", volume: "0,04 l", price: 69 },
      { name: "Kakadu Elixir de Banana", volume: "0,04 l", price: 75 },
      { name: "Legendario Elixir de Cuba 7 yo", volume: "0,04 l", price: 90 },
      { name: "Legendario Ronssé", volume: "0,04 l", price: 85 },
      { name: "El Comandante Reserva Exclusiva", volume: "0,04 l", price: 120 },
      { name: "Ron Zacapa 23 Centenario", volume: "0,04 l", price: 149 },
      { name: "Ron Abuelo Añejo 7 Años", volume: "0,04 l", price: 85 },
      { name: "Ron Abuelo Añejo 12 Años", volume: "0,04 l", price: 120 },
      { name: "Don Papa", volume: "0,04 l", price: 120 },
      { name: "El General 15 yo", volume: "0,04 l", price: 120 },
      { name: "Abuelo Añejo 7 Años", volume: "0,04 l", price: 85 },
      { name: "Abuelo Añejo 12 Años", volume: "0,04 l", price: 120 },
      { name: "Santiago de Cuba Añejo 8 yo", volume: "0,04 l", price: 99 },
      { name: "Santiago de Cuba Extra Añejo 11 yo", volume: "0,04 l", price: 149 },
      { name: "Espero Rum", volume: "0,04 l", price: 95 },
      { name: "Flor de Caña Extra Seco 4 yo", volume: "0,04 l", price: 65 },
      { name: "Flor de Caña Centenario 12 yo", volume: "0,04 l", price: 120 },
      { name: "Kraken Black Spiced", volume: "0,04 l", price: 75 },
    ],
  },
  {
    id: "whisky",
    title: "Whiskey a whisky",
    icon: "🥃",
    items: [
      { name: "Johnnie Walker Red Label", volume: "0,04 l", price: 69 },
      { name: "Johnnie Walker Black Label", volume: "0,04 l", price: 120 },
      { name: "Dubliner Irish Whiskey Liqueur", volume: "0,04 l", price: 65 },
      { name: "Tullamore D.E.W.", volume: "0,04 l", price: 69 },
      { name: "Tullamore D.E.W. Honey", volume: "0,04 l", price: 69 },
      { name: "Clan Campbell", volume: "0,04 l", price: 55 },
      { name: "Clan Campbell Honey", volume: "0,04 l", price: 55 },
      { name: "Glenfiddich 12 yo", volume: "0,04 l", price: 120 },
      { name: "Monkey Shoulder", volume: "0,04 l", price: 120 },
      { name: "Buffalo Trace Kentucky", volume: "0,04 l", price: 95 },
      { name: "Aerstone Land Cask 10 yo", volume: "0,04 l", price: 95 },
      { name: "Grant's", volume: "0,04 l", price: 69 },
      { name: "Grant's 8", volume: "0,04 l", price: 85 },
      { name: "Grant's 12", volume: "0,04 l", price: 120 },
    ],
  },
  {
    id: "bourbon",
    title: "Bourbon",
    icon: "🥃",
    items: [
      { name: "Jim Beam", volume: "0,04 l", price: 59 },
      { name: "Jim Beam Honey (likér)", volume: "0,04 l", price: 59 },
      { name: "Jim Beam Apple", volume: "0,04 l", price: 59 },
      { name: "Jack Daniel's", volume: "0,04 l", price: 89 },
      { name: "Jack Daniel's Honey (likér)", volume: "0,04 l", price: 89 },
      { name: "Jack Daniel's Fire", volume: "0,04 l", price: 89 },
      { name: "Jack Daniel's Apple", volume: "0,04 l", price: 89 },
      { name: "Jack Daniel's Blackberry", volume: "0,04 l", price: 89 },
    ],
  },
  {
    id: "gin",
    title: "Gin",
    icon: "🫒",
    items: [
      { name: "Gordon's London Dry Gin", volume: "0,04 l", price: 75 },
      { name: "Gordon's Premium Pink Gin", volume: "0,04 l", price: 79 },
      { name: "Tanqueray London Dry Gin", volume: "0,04 l", price: 95 },
      { name: "Roku Gin", volume: "0,04 l", price: 99 },
      { name: "Hendrick's Gin", volume: "0,04 l", price: 120 },
      { name: "Gin Sul", volume: "0,04 l", price: 120 },
      { name: "Gin June", volume: "0,04 l", price: 90 },
      { name: "Gin G'Vine", volume: "0,04 l", price: 90 },
      { name: "Bohemian Gin", volume: "0,04 l", price: 119 },
    ],
  },
  {
    id: "vodka",
    title: "Vodka",
    icon: "🧊",
    items: [
      { name: "Amundsen Deep Blue", volume: "0,04 l", price: 59 },
      { name: "Vodka Seven", volume: "0,04 l", price: 59 },
      { name: "Stoli", volume: "0,04 l", price: 79 },
      { name: "Pravda", volume: "0,04 l", price: 105 },
      { name: "Finlandia Coconut", volume: "0,04 l", price: 60 },
    ],
  },
  {
    id: "tequila",
    title: "Tequila",
    icon: "🌵",
    items: [
      { name: "Tres Alegres Compadres Blanco", volume: "0,04 l", price: 95 },
      { name: "Tres Alegres Compadres Reposado", volume: "0,04 l", price: 95 },
      { name: "Teremana Blanco", volume: "0,04 l", price: 120 },
      { name: "Teremana Reposado", volume: "0,04 l", price: 120 },
      { name: "Herencia de Plata Blanco", volume: "0,04 l", price: 95 },
      { name: "Don Julio Blanco", volume: "0,04 l", price: 190 },
      { name: "Mezcal San Cosme", volume: "0,04 l", price: 130 },
    ],
  },
  {
    id: "brandy",
    title: "Brandy a koňak",
    icon: "🥃",
    items: [
      { name: "Metaxa Honey Shot", volume: "0,04 l", price: 50 },
      { name: "Rémy Martin", volume: "0,04 l", price: 120 },
      { name: "Metaxa 12*", volume: "0,04 l", price: 120 },
    ],
  },
  {
    id: "destilaty",
    title: "Ovocné a ostatní destiláty",
    icon: "🍑",
    items: [
      { name: "Bartida Slivovice", volume: "0,04 l", price: 65 },
      { name: "Baron Hildprandt", volume: "0,04 l", price: 95 },
      { name: "Sambuca", volume: "0,04 l", price: 85 },
    ],
  },
  {
    id: "byliny",
    title: "Bylinné likéry a lihoviny",
    icon: "🌿",
    items: [
      { name: "Fernet Stock Original", volume: "0,04 l", price: 55 },
      { name: "Fernet Stock Citrus", volume: "0,04 l", price: 55 },
      { name: "Fernet Lime", volume: "0,04 l", price: 55 },
      { name: "Fernet Blood Orange", volume: "0,04 l", price: 55 },
      { name: "Fernet Stock Barrel", volume: "0,04 l", price: 65 },
      { name: "Becherovka", volume: "0,04 l", price: 65 },
      { name: "Becherovka ochucená", volume: "0,04 l", price: 65 },
      { name: "Jägermeister", volume: "0,04 l", price: 69 },
      { name: "Jägermeister Orange", volume: "0,04 l", price: 69 },
      { name: "Jägermeister Manifest", volume: "0,04 l", price: 89 },
      { name: "Mandlička", volume: "0,04 l", price: 79 },
      { name: "Višnička", volume: "0,04 l", price: 79 },
      { name: "Jeřabinka", volume: "0,04 l", price: 79 },
      { name: "Bohemian Spicer", volume: "0,04 l", price: 69 },
    ],
  },
  {
    id: "bartida",
    title: "Bartida Original likéry a lihoviny",
    icon: "🍒",
    items: [
      { name: "Bartida Original Zelená", volume: "0,04 l", price: 65 },
      { name: "Bartida Original Griotka", volume: "0,04 l", price: 60 },
      { name: "Bartida Original Čert", volume: "0,04 l", price: 60 },
      { name: "Bartida Absinth", volume: "0,04 l", price: 80 },
      { name: "Absinth 70 %", volume: "0,04 l", price: 90 },
      { name: "Crème de la Crème", volume: "0,04 l", price: 75 },
      { name: "Baileys Original", volume: "0,04 l", price: 59 },
      { name: "Amundsen Fusion", volume: "0,04 l", price: 50 },
      { name: "Malibu", volume: "0,04 l", price: 65 },
      { name: "Shanky's Whip 33 %", volume: "0,04 l", price: 65 },
      { name: "Božkov Modrá", volume: "0,04 l", price: 55 },
    ],
  },
  {
    id: "vino",
    title: "Víno sudové (Vinařství Krist)",
    icon: "🍷",
    naUvod: true,
    items: [
      { name: "Rozlévané bílé víno (dle nabídky)", volume: "0,2 l", price: 52 },
      { name: "Rozlévané červené víno (dle nabídky)", volume: "0,2 l", price: 52 },
    ],
  },
  {
    id: "sekt",
    title: "Sekt a šumivé víno",
    icon: "🥂",
    items: [
      { name: "Bohemia Sekt", volume: "0,75 l", price: 320 },
      { name: "Prosecco", volume: "0,75 l", price: 450 },
      { name: "Prosecco", volume: "0,1 l", price: 35 },
    ],
  },
  {
    id: "nealko",
    title: "Nealkoholické nápoje",
    icon: "🥤",
    naUvod: true,
    items: [
      { name: "Pepsi Cola", volume: "0,25 l", price: 50 },
      { name: "Mirinda", volume: "0,25 l", price: 50 },
      { name: "Schweppes Tonic", volume: "0,25 l", price: 50 },
      { name: "Džusy Toma (dle nabídky)", volume: "0,25 l", price: 50 },
      { name: "Mattoni jemně perlivá", volume: "0,33 l", price: 50 },
      { name: "Aquila neperlivá", volume: "0,33 l", price: 50 },
      { name: "Domácí limonáda (dle nabídky)", volume: "0,5 l", price: 65 },
      { name: "Red Bull", volume: "0,25 l", price: 69 },
      { name: "Postmix", volume: "0,1 l", price: 15 },
    ],
  },
];

// Jídelní lístek (TOM'S Pizza). Dokud je prázdný, na webu se nezobrazuje.
export const jidlo: Category[] = [];

export const kc = (price: number) => `${price.toLocaleString('cs-CZ')} Kč`;
