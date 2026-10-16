// Recenze hostů. Kopírujte sem jen skutečné recenze (Google, Facebook, Mapy.cz),
// ideálně se jménem tak, jak je autor uvedl, a se zdrojem.
// Dokud je seznam prázdný, web místo recenzí ukáže výzvu k napsání recenze.
export interface Recenze {
  jmeno: string;
  text: string;
  hvezdy?: number; // 1–5
  zdroj: 'Google' | 'Facebook' | 'Mapy.cz';
}

export const recenze: Recenze[] = [];

// Souhrnné hodnocení, např. { prumer: 4.8, pocet: 120, zdroj: 'Google' }. Prázdné = nezobrazí se.
export const hodnoceni: { prumer: number; pocet: number; zdroj: string } | null = null;

// Odkaz, kde mohou hosté napsat recenzi (ideálně přímý odkaz z Google profilu firmy).
export const odkazNaRecenzi = '';
