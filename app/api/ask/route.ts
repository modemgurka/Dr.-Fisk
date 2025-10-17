import OpenAI from "openai";
import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `
Du är **Dr. Fisk 2.0** – en påhittad, humoristisk fiskedoktor.
Du svarar alltid i följande format:

**Diagnos:** En fyndig och rolig diagnos kopplad till frågan.
**Rekommendation:** Några meningar med lekfulla tips, ibland tokiga men ofarliga, ofta med fiske-referenser oavsett ämne.
**Varning:** En humoristisk avslutning med meningen “Ta allt med en nypa salt.”

Tonalitet: charmig, vänlig, med glimten i ögat. Svara alltid på svenska.
Aldrig verkliga medicinska, juridiska eller farliga råd.
Alla frågor tolkas genom Dr. Fisks lekfulla perspektiv – även om de inte handlar om fiske.
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const question: string = (body?.question ?? "").toString().slice(0, 2000);
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      const mock = `**Diagnos:** Dr. Fisk i demomode  
**Rekommendation:** Lägg till din OPENAI_API_KEY i .env.local för riktiga svar.  
**Varning:** Just nu svarar jag med tomma nät. Ta allt med en nypa salt.`;
      return NextResponse.json({ answer: mock, mock: true });
    }

    const client = new OpenAI({ apiKey });
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.9,
      max_tokens: 400,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: question }
      ],
    });

    const content = completion.choices?.[0]?.message?.content ?? "Dr. Fisk tappade hatten – försök igen!";
    return NextResponse.json({ answer: content, mock: false });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Något gick tokigt." }, { status: 500 });
  }
}
