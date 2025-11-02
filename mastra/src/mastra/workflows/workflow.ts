import { createWorkflow, createStep } from "@mastra/core/workflows";
import { confluenceSearchPagesTool, confluenceGetPageTool } from "../tools/confluenceTool";
import { assistantAgent } from "../agents/assistantAgent";
import { z } from "zod";


//ステップ作成
const confluenceSearchPagesStep = createStep(confluenceSearchPagesTool);
const confluenceGetPageStep = createStep(confluenceGetPageTool);

export const handsonworkflow = createWorkflow({
    id: "handsonworkflow",
    description: "自然言語の質問からConfluenceで要件書を検索し、内容を要約して回答します。",
    inputSchema: z.object({
        query: z.string().describe("検索したい内容を自然言語で入力してください(例: 「AIについての情報」「最新のプロジェクト情報」"),

    }),
    outputSchema: z.object({
        text: z.string().describe("要約された回答"),
    }),
}).then(
    createStep({
        id: "generate-cql-query",
        inputSchema: z.object({
            query: z.string(),
        }),
        outputSchema: z.object({ cql: z.string() }),
        execute: async({ inputData }) => {
            const prompt = `
            以下の自然言語の検索要求を、Confluence CQL(Confluence Query Language)に変換してください。
            CQLの基本的な構文:
            - text ~ "検索語": 全文検索
            - title ~ "タイトル": タイトル検索
            - space = "スペースキー": 特定のスペース内検索
            - type = page: ページのみ検索
            - created >= "2024-01-01": 日付フィルタ

            検索要求: ${inputData.query}

            重要:
            - 単純な単語検索の場合は、text - "単語"の形式を使用
            - 複数の単語を含む場合は AND で結合
            - 日本語の検索語もそのまま使用可能
            - レスポンスはCQLクエリのみを返してください

            CQLクエリ:`
        }
    })
)