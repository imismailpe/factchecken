import { checkFacts } from "@/app/mcps/checkfact";

export async function POST(req) {
  const body = await req.json();
  const { input } = body;
  const aiResp = await checkFacts(input.content);
  return new Response(JSON.stringify(aiResp), {
    status: 200
  });
}