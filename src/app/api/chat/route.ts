import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemPrompt = {
      role: "system",
      content: "You are the AI assistant for Atelier Interiors, a premium interior design studio. Be elegant, concise, and helpful. You can help users book appointments, learn about services (Interior Architecture, Bespoke Furniture, Lighting Design), and explore design philosophies."
    };

    const chatCompletion = await groq.chat.completions.create({
      messages: [systemPrompt, ...messages],
      model: "llama-3.1-8b-instant", // Fast and capable model
    });

    const reply = chatCompletion.choices[0]?.message?.content || "I'm sorry, I cannot assist right now.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Groq API error:", error);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}
