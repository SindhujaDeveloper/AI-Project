import { ChatOpenAI } from "langchain/chat_models/openai";
import { NextResponse } from "next/server";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";

export async function POST(request:any) {
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
    const model = new ChatOpenAI({
      streaming: true,
      openAIApiKey: process.env.OPEN_AI_KEY,
    });

    const memory = new BufferMemory();
    const chain = new ConversationChain({ llm: model, memory });

    const botReply = await chain.call({
      input: `Assume you are a funny chatbot.${message}`,
    });

    return NextResponse.json({ message: botReply });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
