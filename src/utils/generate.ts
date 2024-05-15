import OpenAI from "openai";
import { exists } from "./exists";

export class ChurchSignGenerator {
  private openai: OpenAI;

  constructor(openAIApiKey: string) {
    this.openai = new OpenAI({ apiKey: openAIApiKey });
  }

  async validateInput(input: string): Promise<string[]> {
    const response = await fetch("https://api.openai.com/v1/moderations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.openai.apiKey}`,
      },
      body: JSON.stringify({ input }),
    });

    if (!response.ok) {
      throw new Error(`Error \${response.status}: \${response.statusText}`);
    }

    const data = await response.json();

    if (data.results[0].flagged) {
      console.log("Content blocked: Violates usage policies.");
      console.log(`Input: ${input}`);
      console.log("Categories:", data.results[0].categories);
      return Object.entries(data.results[0].categories)
        .filter(([, value]) => value)
        .map(([key]) => key);
    } else {
      return [];
    }
  }

  async generateText({ input }: { input?: string } = {}) {
    const userMessage = input
      ? { role: "user" as const, content: input }
      : undefined;

    const response = await this.openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a church sign generator" },
        ...[userMessage].filter(exists),
      ],
      max_tokens: 100,
      n: 3,
    });

    return response.choices
      .map((choice) => {
        return choice.message.content;
      })
      .filter(exists);
  }
}
