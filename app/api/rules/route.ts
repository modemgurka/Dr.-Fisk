import OpenAI from "openai";
import { NextResponse } from "next/server";

const SYSTEM = `Du är Dr Fisk 2.0. Ge ett kort, humoristiskt svar (50–90 ord) när någon frågar om regler.
Skoja vänligt och hänvisa alltid till lokala föreskrifter, fiskekort och myndigheter/föreningar.
Ge inga riktiga råd eller tolkningar av lagar. Håll det lekfullt och generellt.`;

export async function GET() {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      const mock = "Regler, säger du? Dr Fisk rådnar som en mört! Ta en titt på lokala föreskrifter, fiskekortet och klubbens anslagstavla – där finns sanningen. Jag bjuder bara på skratt och skrönor. Kolla alltid med din förening eller myndighet innan du kastar. Och kom ihåg: den bästa knuten är den som håller – men den gäller inte i lagboken.";
      return NextResponse.json({ rules: mock, mock: true });
    }
    const client = new OpenAI({ apiKey });
    const completion = await client.chat.completions.create({
      model: "gpt-5.1-mini",
      temperature: 0.8,
      max_tokens: 140,
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: "Svara på frågan: 'Vad gäller för minimimått och fredningstider?'" }
      ]
    });
    const text = completion.choices?.[0]?.message?.content ?? "";
    return NextResponse.json({ rules: text, mock: false });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Kunde inte hämta regeltips" }, { status: 500 });
  }
}
