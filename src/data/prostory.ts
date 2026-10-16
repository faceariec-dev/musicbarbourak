// Prostory a zážitky + Služby navíc. `bg` je barva místa, dokud nebude fotka.
// `size`: velikost dlaždice v mozaice (velka = 2×2, siroka = 2×1, mala = 1×1).
import barFoto from '../assets/foto/bar-counter.jpg';

type Size = 'velka' | 'siroka' | 'mala';
export interface Prostor {
  title: string;
  desc: string;
  icon: string;
  bg: string;
  photo: string;
  size: Size;
  foto?: ImageMetadata;
}
export const prostory: Prostor[] = [
  { title: 'Hudba & DJ', desc: 'Pravidelné akce a skvělá hudba.', icon: '🎵', bg: '#1e2a5b', photo: 'DJ pult', size: 'velka', foto: barFoto },
  { title: 'Narozeninové oslavy', desc: 'Oslavte u nás stylově!', icon: '🎁', bg: '#5b2a7a', photo: 'narozeninová oslava', size: 'mala' },
  { title: 'Firemní akce', desc: 'Teambuilding a večírky na míru.', icon: '💼', bg: '#2a2a2a', photo: 'firemní setkání', size: 'mala' },
  { title: 'Soukromé párty', desc: 'Soukromí, hudba, zábava.', icon: '🍸', bg: '#7a1f2e', photo: 'soukromá párty', size: 'siroka' },
  { title: 'Šipky / Fotbálek / Stolní tenis', desc: 'Zábava pro každého.', icon: '🎯', bg: '#3a3a2a', photo: 'terč na šipky', size: 'siroka' },
  { title: "TOM'S Pizza", desc: 'Poctivé pizzy z pece!', icon: '🍕', bg: '#8a3a1f', photo: 'pizza', size: 'siroka' },
];

export const sluzby = [
  { title: 'PPL Parcelshop', desc: 'Rychle a pohodlně u nás.', icon: '📮' },
  { title: 'DPD AlzaBox', desc: 'Vyzvedněte kdykoliv (7:00–22:00).', icon: '📦' },
];
