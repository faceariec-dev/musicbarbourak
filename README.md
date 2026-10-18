# Music Bar Bourák – web

Statický web v [Astru](https://astro.build): jednostránkový úvod, celý nápojový lístek (`/napojovy-listek/`), speciální drinky (`/specialni-drinky/`) a generátor letáků (`/generator-letaku/`, samostatná aplikace bez buildu).

## Lokální spuštění

```bash
npm ci
npm run dev        # vývoj na http://localhost:4321/bourak/
npm run build      # statický výstup do dist/
npm run preview    # náhled sestaveného webu
```

## Co kde změnit

| Co | Kde |
|---|---|
| **Nápojový lístek** (kategorie, položky, ceny) a jídelní lístek | `src/data/napoje.ts` – úvod ukáže prvních 5 položek z každé kategorie, celý lístek je na `/napojovy-listek/`. Jídelní lístek (`jidlo`) se zobrazí, jakmile do něj přibude první kategorie. |
| **Akce** | `src/data/akce.ts` – `terminy` jsou akce s datem (po skončení samy zmizí), `pravidelne` je kvíz, disco apod. |
| **Speciální drinky** | `src/data/specialni-drinky.ts`, fotky v `src/assets/drinks/` |
| **Kontakty, otevírací doba, Facebook/Instagram** | `src/data/site.ts` |
| **PDF ke stažení** | soubor do `public/pdf/`, řádek do `downloads` v `src/data/site.ts` – odkaz se objeví v kontaktech, v patičce a u lístku |
| **Prostory a služby** | `src/data/prostory.ts` |
| **Vzhled** | `src/styles/style.css` (původní design), `src/styles/extra.css` (doplňky) |

Nápojový lístek se dá vytisknout nebo uložit jako PDF přímo z prohlížeče (tlačítko na stránce lístku, tiskový styl je připravený).

## Rezervace

Telefon je hlavní cesta. Formulář pro oslavy a firemní akce zatím otevře e-mail návštěvníka s předvyplněnou zprávou na `musicbarbourak@seznam.cz` – nepotřebuje server. Až bude jasný hosting, dá se přepnout na odesílání přes PHP jako u Penzionu 48.

## Adresa webu

Výchozí nastavení počítá s podsložkou `https://www.pension48.cz/bourak/`. Pro vlastní doménu stačí při buildu nastavit:

```bash
SITE=https://www.vase-domena.cz BASE=/ npm run build
```

## Nasazení na FORPSI

Web běží na `https://www.pension48.cz/bourak/`. Nasazuje se ručně v GitHubu: **Actions → Deploy to FORPSI → Run workflow** (vyberte větev, ze které se má web sestavit).

Workflow web sestaví (`npm run build`), hotovou složku `dist/` uloží do větve `forpsi-web` a server na FORPSI si ji přes SSH stáhne do `/www/bourak`. Potřebuje v nastavení repozitáře secrets `FORPSI_HOST`, `FORPSI_USER` a `FORPSI_SSH_KEY`. Větev `forpsi-web` se přepisuje při každém nasazení, ručně do ní nic nepište.
