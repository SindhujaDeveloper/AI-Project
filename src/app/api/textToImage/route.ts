import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: any) {
  if (!process.env.OPEN_AI_KEY) {
    return NextResponse.json(
      {
        error:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
      { status: 500 }
    );
  }

  const requestBody = await request.json();

  const message = requestBody.message;

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPEN_AI_KEY
    });

    const botReply = await openai.images.generate({ prompt: message, n: 3, size: '256x256' });
    return NextResponse.json({ images: botReply.data });

  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

