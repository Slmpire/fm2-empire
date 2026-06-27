// ============================================================
// FM2 EMPIRE — CHAT API ROUTE
// Server-side only. The Gemini API key lives here and is
// never exposed to the browser. The chat widget calls this
// route; this route calls Gemini.
// ============================================================

import { NextRequest, NextResponse } from "next/server";

// ------------------------------------------------------------
// FM2 KNOWLEDGE BASE
// This is what the AI knows about FM2. Update this as the
// real FAQ/service list grows — no other code changes needed.
// ------------------------------------------------------------

const SYSTEM_CONTEXT = `You are the official AI assistant for FM2 Empire, a media, content, talent development, and creative ecosystem based in Lagos, Nigeria.

WHAT FM2 DOES:
- Talent Development: identifying, coaching, and developing artists/musicians/performers long-term
- Media Production: music videos, podcasts, short films, social content, brand campaigns
- Internship Program: hands-on creative industry experience for students and young professionals
- Events & Experiences: hosting and producing live events, plus ticketing infrastructure for partner organisations
- Creative Services: working with independent clients/brands who don't want to join the FM2 roster but need production/creative help
- Partnerships: collaborating with brands, organisations, and institutions

HOW PEOPLE GET INVOLVED:
- Artists/talent enroll through the talent enrollment form (linked from the homepage "Join FM2" buttons)
- Students apply through the internship application
- Brands/organisations submit a service request or partnership inquiry
- Anyone can reach the team directly via the /contact page

EVENTS & TICKETS:
- FM2 hosts its own events and also features/manages ticketing for partner organisations
- Ticket prices and event details are listed on each event's page (accessible from the homepage Events section)
- Online checkout is still being finalized — for now, people should contact the team directly to reserve a ticket

MEDIA:
- FM2 produces music, podcasts, video, original series, and photo content
- Currently hosted via YouTube/Spotify embeds, viewable in the Media Library (/media)
- A future paid-access tier for premium content is planned but not live yet

TONE: Friendly, concise, confident — reflect FM2's energetic, professional creative brand. Keep answers SHORT (2-4 sentences max) unless the person asks for more detail. If you don't know something specific (like an exact event date or precise pricing not listed above), tell them to check the relevant page or contact the team at /contact — never make up specific facts.

Do not discuss anything unrelated to FM2 Empire. If asked something off-topic, politely redirect to how you can help with FM2.`;

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Chat service is not configured." },
        { status: 500 }
      );
    }

    // Build conversation contents for Gemini's format
    const contents = [
      ...(history ?? []).map((h: { role: string; text: string }) => ({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.text }],
      })),
      { role: "user", parts: [{ text: message }] },
    ];


    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: SYSTEM_CONTEXT }] },
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 300,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", errorText);
      return NextResponse.json(
        { error: "Failed to get a response. Please try again." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Sorry, I couldn't generate a response. Please try rephrasing your question.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}