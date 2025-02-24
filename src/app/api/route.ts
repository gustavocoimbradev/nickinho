import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { text } = await req.json();

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_TOKEN}`
            },
            body: JSON.stringify({
                model: "deepseek-r1-distill-llama-70b",
                messages: [{ role: "user", content: `${process.env.INSTRUCTIONS} ${text}` }]
            })
        });

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
