import OpenAI from "openai";
import { NextResponse } from "next/server";

const SYSTEM = `Du skriver en kort och humoristisk fiskeskröna (80–120 ord), påhittad och ofarlig.
Använd vardaglig ton, gärna ett internt skämt (gäddtänder, bomhugg, trassel).
Avsluta med en liten twist. Svara endast med själva berättelsen utan rubriker.`;

export async function GET() {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      const mock = "Jag kastade precis där vassen mötte molnen, och redan på första vevet small det — trodde jag. Det var bara min egen keps som fastnade i kroken och flög som en uppretad mås. Grannen i båten skrattade så han tappade mackan, vilket lockade fram abborren som tydligen föredrar ost. När kepsen till sist landade på mitt huvud igen stod gäddan vid relingen och applåderade med fenorna (inbillat, men ändå). Vi fick inget i håven, men en historia som nappade fast rejält.";
      return NextResponse.json({ tale: mock, mock: true });
    }
    const client = new OpenAI({ apiKey });
    const completion = await client.chat.completions.create({
      model: "gpt-5.1-mini",
      temperature: 0.95,
      max_tokens: 220,
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: "Skriv en skröna om en gädda som nästan högg, och en komisk miss." }
      ]
    });
    const text = completion.choices?.[0]?.message?.content ?? "";
    return NextResponse.json({ tale: text, mock: false });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Kunde inte skapa skröna" }, { status: 500 });
  }
}
