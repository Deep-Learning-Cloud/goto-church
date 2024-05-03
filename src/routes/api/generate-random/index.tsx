import { type RequestHandler } from "@builder.io/qwik-city";
import { ChurchSignGenerator } from "~/utils/generate";

export const onGet: RequestHandler = async ({ json, env }) => {
  const openAIAPIKey = env.get("OPENAI_API_KEY");
  if (openAIAPIKey == null) throw new Error("OpenAI API Key is not set");

  const generator = new ChurchSignGenerator(openAIAPIKey);

  const texts = await generator.generateText();
  json(200, texts);
};
