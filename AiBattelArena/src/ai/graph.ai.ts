import { StateGraph, StateSchema, START, END, type GraphNode, type CompiledStateGraph } from "@langchain/langgraph"
import { mistralmodel, coheremodel } from "./model.ai.js";
import { createAgent, HumanMessage, toolStrategy, } from "langchain"

import { promise, z } from "zod";

const state = new StateSchema({
    problem: z.string().default(""),
    solution_1: z.string().default(""),
    solution_2: z.string().default(""),
    judge: z.object({
        solution_1_score: z.number().default(0),
        solution_2_score: z.number().default(0),
        solution_1_resoning: z.string().default(""),
        solution_2_resoning: z.string().default(""),
    })
})


const solutionNode: GraphNode<typeof state> = async (state) => {

    let [mistralresponse, coherresponse] = await Promise.all([

        mistralmodel.invoke(state.problem),
        coheremodel.invoke(state.problem)
    ])

    return {
        solution_1: mistralresponse.text,
        solution_2: coherresponse.text
    }
}

const Judgesolution: GraphNode<typeof state> = async (state) => {

    let { problem, solution_1, solution_2 } = state

    let judge = createAgent({
        model: mistralmodel,
        responseFormat: toolStrategy(z.object({
            solution_1_score: z.number().min(0).max(10),
            solution_2_score: z.number().min(0).max(10),
            solution_1_reasoning: z.string(),
            solution_2_reasoning: z.string(),
        })),
        systemPrompt: ` you are a judge tasked with evaluting two solution generatex by different Ai modelas plese provide a score out of 10 for each solution along with your resoing for the scores`
    })

    let judgeResonse = await judge.invoke({
        messages: [
            new HumanMessage(
                `
                 problem: ${problem}
                 solution 1: ${solution_1}
                 solution 2: ${solution_2}
                 please evalute the solution and provide score and reasoing.
                
                `
            )
        ]
    })


    let { solution_1_score, solution_2_score,
        solution_1_reasoning,
        solution_2_reasoning
    } = judgeResonse.structuredResponse

    return {
        judge: {
            solution_1_score,
            solution_2_score,
            solution_1_reasoning,
            solution_2_reasoning
        }
    }

}

const Graph = new StateGraph(state)
    .addNode("solution", solutionNode)
    .addNode("judge_node", Judgesolution)
    .addEdge(START, "solution")
    .addEdge("solution", "judge_node")
    .addEdge("judge_node", END)
    .compile()

export default async function(problem:string) {

    let result = await Graph.invoke({
        problem:problem
    })

   return result

}


