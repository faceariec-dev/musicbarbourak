# Bourák – generátor A5 letáků

Statická HTML/CSS/JS aplikace pro GitHub Pages. Nepotřebuje PHP, databázi ani build krok.

## První verze

- aktivní šablona Hazbin Hotel,
- 3 / 5 / 7 položek,
- název koktejlu, ingredience a cena,
- živý A5 náhled,
- automatické uložení do localStorage,
- export PNG,
- export tiskového PDF,
- A5 trim + 3 mm spadávka + ořezové značky,
- 300 DPI artwork.

## Umístění

Aplikace je oddělená od hlavního webu ve složce:

`/generator-letaku/`

Při nasazení přes GitHub Pages bude dostupná na:

`https://<uzivatel>.github.io/<repo>/generator-letaku/`

## Další šablony

Editor a exportní vrstva jsou společné. Nová grafická akce se přidá jako další šablona v `app.js`; může mít vlastní pozice, barvy a typografii, zatímco formulář 3/5/7 položek zůstane stejný.

## Tisk

Aktuální MVP renderuje výslednou grafiku do 300DPI artworku a vkládá ji do PDF. Pro finální produkční CMYK/PDF-X workflow lze v další verzi přepnout renderer na připravené PDF master šablony a doplňovat do nich text přímo.
