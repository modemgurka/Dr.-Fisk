# Dr Fisk v5g – Tailwind v3 stabilt paket

Detta zip innehåller allt för att köra Tailwind **v3** (som funkar bra med Next 14):
- `tailwind.config.js`
- `postcss.config.js`
- `app/globals.css` (v3-syntax: @tailwind base/components/utilities)
- `app/layout.tsx` (importerar globals.css)
- `app/page.tsx` (snygg layout + liten rund avatar, hårdsatt 56×56 även utan Tailwind)

## Installera

1. Stäng dev-servern (Ctrl+C).
2. Packa upp zippen över **dr-fisk-2-demo** och ersätt filerna när du blir tillfrågad.
3. I terminalen (i projektmappen), kör:
   ```bash
   npm remove @tailwindcss/postcss tailwindcss
   npm i -D tailwindcss@3 postcss autoprefixer
   npx tailwindcss init -p
   ```
   (Kommandot `init -p` skapar filer, men våra versioner i zippen är redan korrekta – det gör inget om du skriver över.)
4. Starta om dev-servern:
   ```bash
   npm run dev
   ```
5. Öppna `http://localhost:3000`.

## Om det fortfarande ser konstigt ut
- Stäng servern, **ta bort mappen `.next`** i projektroten (kan göras i Utforskaren), starta igen.
- Säkerställ att din avatar ligger på: `public/icons/dr-fisk.png` (exakt filnamn).

Nu ska Tailwind-stilarna ladda, avataren vara liten/rund och sidan se prydlig ut.
