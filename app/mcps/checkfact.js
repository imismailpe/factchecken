import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

const factCheckSchema = z.object({
  data: z.object({
    fully_correct: z.boolean(),
    partially_correct: z.boolean(),
    fully_incorrect: z.boolean(),
    claims: z.array(
      z.object({
        claim: z.string(),
        is_correct: z.boolean(),
      })
    ),
    facts: z.array(z.string()),
  }),
});

export const checkFacts = async (userInput) => {
  const { object } = await generateObject({
    model: google("gemini-2.5-flash"),
    prompt: userInput,
    schema: factCheckSchema,
    system:
      "You are a historian, journalist, scienctist and General knowledge genius. You can identify false claims on given statements or forwarded messages based on evidence, common sense, historical facts, general knowlege and science.",
  });
  return object.data;
};
