import { type RequestHandler } from "@builder.io/qwik-city";
import { ChurchSignGenerator } from "~/utils/generate";

const minimumRequestTime = 5000;

export const onPost: RequestHandler = async ({ json, env, parseBody }) => {
  const now = new Date();

  const body = (await parseBody()) as
    | { text: string }
    | { regenerate: string }
    | null;

  const openAIAPIKey = env.get("OPENAI_API_KEY");
  if (openAIAPIKey == null) throw new Error("OpenAI API Key is not set");

  const generator = new ChurchSignGenerator(openAIAPIKey);

  let texts;

  if (body == null) {
    texts = await generator.generateText();
  } else if ("text" in body) {
    const rejections = await generator.validateInput(body.text);
    if (rejections.length > 0) {
      json(400, {
        error: "Content is potentially in violation of content policy",
        rejections,
      });
      return;
    }
    texts = await generator.generateText({ input: body.text });
  } else if ("regenerate" in body) {
    const rejections = await generator.validateInput(body.regenerate);
    if (rejections.length > 0) {
      json(400, {
        error: "Content is potentially in violation of content policy",
        rejections,
      });
      return;
    }
    texts = await generator.createVariations({ input: body.regenerate });
  } else {
    json(400, { error: "Invalid request" });
    return;
  }

  const elapsed = new Date().getTime() - now.getTime();
  if (elapsed < minimumRequestTime) {
    await new Promise((resolve) =>
      setTimeout(resolve, minimumRequestTime - elapsed),
    );
  }

  json(200, texts);
};
