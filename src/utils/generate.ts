import OpenAI from "openai";
import { exists } from "./exists";

const instructions = `The message follow the instructions given from the user input and should fit on a sign, approximately 15-30 words. Your output should ONLY be the message, nothing else.`;
const defaultSystemPrompt = `You are a church sign generator. Create a single message for a church sign. ${instructions}`;
const variantionSystemPrompt = `You are a church sign generator. Create variations of the message you receive. ${instructions}`;
const randomUserPrompt = `Do not referencing any dates, holidays, time or days of the week.`;

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

  async generateText({
    input,
    systemPrompt = defaultSystemPrompt,
  }: { input?: string; systemPrompt?: string } = {}) {
    const userMessage = input
      ? { role: "user" as const, content: input }
      : { role: "user" as const, content: randomUserPrompt };

    console.log([{ role: "system", content: systemPrompt }, userMessage]);
    const response = await this.openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: systemPrompt }, userMessage],
      max_tokens: 100,
      n: 3,
    });

    return response.choices
      .map((choice) => {
        return choice.message.content?.replace(/^["“](.*)["”]$/, "$1");
      })
      .filter(exists);
  }

  async createVariations({ input }: { input: string }) {
    return this.generateText({
      input,
      systemPrompt: variantionSystemPrompt,
    });
  }
}
