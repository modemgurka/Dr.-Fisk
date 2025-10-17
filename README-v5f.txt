# Dr Fisk v5f – Full Tailwind-setup + hårdsatt avatarstorlek

Detta paket innehåller:
- `tailwind.config.js` och `postcss.config.js` (rot)
- `app/layout.tsx` + `app/globals.css`
- `app/page.tsx` (avatar width/height sätts även inline så den är liten även utan Tailwind)

## Så installerar du
1. Stäng dev-servern (Ctrl+C).
2. Packa upp zippen över ditt projekt **dr-fisk-2-demo** och ersätt filerna.
3. Kontrollera att du har Tailwind installerat:
   ```
   npm i -D tailwindcss postcss autoprefixer
   ```
4. Starta igen:
   ```
   npm run dev
   ```
5. Öppna `http://localhost:3000` — avataren ska nu vara liten/rund, och layouten stylad.

Om Tailwind fortfarande inte syns: radera `.next`-mappen, starta om dev-servern.
