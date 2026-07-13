import type { Request, Response } from "express";
import { getMcpClient } from "../services/mcp.serice.ts";
import { generateAiResponse } from "../services/gemeni.service.ts";

export const testmcpcontroller = async (req: Request, res: Response) => {
  const client = await getMcpClient();

  const tools = await client.listTools();

  const result = await client.callTool({
    name: "recommend_cats",
    arguments: {
      kidsFriendly: true,
      apartmentFriendly: false,
    },
  });

//   console.log(result)

  let catsData = result.content[0].text;

  let prompt = `
  
  Available cats

${catsData}

recommend bad cats from this data

  `;

  let aiResponse = await generateAiResponse(prompt);

  return res.json({
    success: true,
    data: aiResponse,
  });
};
