import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getAllCatsTool, recommandedcatsTool } from "./Tools/recommandedcats.ts";

// Create server instance
const server = new McpServer({
  name: "tiny-Cat",
  version: "1.0.0",
});


server.registerTool(
  "recommend_cats",

  {
    title: "recommend_cats",
    description: "Recommend a Best Cat breed according to Inputs",
    inputSchema: {
      kidsFriendly: z.boolean(),
      apartmentFriendly: z.boolean(),
    },
  },

  async ({ kidsFriendly, apartmentFriendly }) => {
    const result = await recommandedcatsTool(kidsFriendly, apartmentFriendly);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result),
        },
      ],
    };
  },
);

server.registerTool(
  "get_all_cats",
  {
    title: "all cats",
    description: "cats Data",
  },
  async () => {
    const result = await  getAllCatsTool();

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result),
        },
      ],
    };
  }
);


const transpoter = new StdioServerTransport()
await server.connect( transpoter)

console.error("tiny cats mcp running..");
