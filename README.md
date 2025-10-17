# Dr Fisk 2.0 – Demo v4

Humoristisk fiskedoktor som svarar larvigt och snällt. Next.js + API-rutter.

## Snabbstart
```bash
npm i
npm run dev
# http://localhost:3000
```
Miljövariabel (valfri, för riktiga AI-svar):
```
OPENAI_API_KEY=sk-...din-nyckel...
```

## Funktioner
- 🧑‍⚕️ **Dr Fisk**: /api/ask (Diagnos/Rekommendation/Varning)
- 🎣 **Dragnamn**: /api/lures
- 📖 **Skrönemaskin**: /api/tale
- 📜 **Regler?**: /api/rules (lekfull hänvisning, inga riktiga råd)
- 🔊 **TTS**-uppläsning
- 🔗 **Dela**: kopiera länk, Web Share, WhatsApp
- 🖼️ **Avatar**: `/public/icons/dr-fisk-avatar.png` (eller `.svg` fallback)

## Deploy (Vercel)
- Importera repo → lägg `OPENAI_API_KEY` → deploy.
