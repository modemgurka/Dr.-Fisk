import OpenAI from "openai";
import { NextResponse } from "next/server";

const SYSTEM = `Du skapar namn på fiskedrag. Svara enbart med en kommaseparerad lista (ingen förklaring). Namnen ska vara korta, kul, minnesvärda. Blandning av svenska/engelsk klingande, gärna med fisketouch (gädda/abborre). 8–12 namn.`;

export async function GET() {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      const mock = "Blåfräsarn, Svartpyton 3000, Gäddviz, AbboRocker, Silverstorm, TångTango, FenFrenzy, Vasspiru, NappNinja, PikePop 2.0, TrasselTrix, VassVobblern";
      return NextResponse.json({ names: mock.split(",").map(s => s.trim()) });
    }
    const client = new OpenAI({ apiKey });
    const completion = await client.chat.completions.create({
      model: "gpt-5.1-mini",
      temperature: 0.9,
      max_tokens: 80,
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: "Ge mig 10 nya dragnamn." }
      ]
    });
    const text = completion.choices?.[0]?.message?.content ?? "";
    const names = text.split(",").map(s => s.trim()).filter(Boolean).slice(0, 12);
    return NextResponse.json({ names });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Kunde inte skapa dragnamn" }, { status: 500 });
  }
}
