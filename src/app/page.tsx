'use client';

import { useState, useEffect, useRef } from 'react';

import { Message } from '@/components/Message';


export default function Chat() {

  const [text, setText] = useState<string>('');
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);

  const messagesRef = useRef<HTMLDivElement|null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;
    const userMessage = { from: "human", text };
    setMessages((prev) => [...prev, userMessage]);
    setText("");
    const botResponse = await requestAnswer(text);
    setMessages((prev) => [...prev, { from: "bot", text: botResponse }]);
  };

  const requestAnswer = async (text: string) => {
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      const message = data.choices[0].message.content.replace(/<think>[\s\S]*?<\/think>/g, "");
      return message;
    } catch (error) {
      console.error("Erro ao chamar API:", error);
      return "Não estou afim de conversar agora.";
    }
  };

  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    (async () => {
      const initialMessage = `${process.env.INSTRUCTIONS} Olá`;
      const botResponse = await requestAnswer(initialMessage);
      setMessages((prev) => [...prev, { from: "bot", text: botResponse }]);
    })();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-indigo-400">
      <h1 className="mb-4 text-indigo-100 font-bold text-5xl text-center">Nickinho</h1>
      <h4 className="mb-6 text-indigo-100 text-md text-center">&ldquo;Inteligência&ldquo; artificial mais &ldquo;confiável&ldquo; da Internet</h4>
      <div className="bg-indigo-200 rounded-2xl overflow-hidden shadow-sm h-[400px] w-[700px] max-w-[90%] flex flex-col">
        <div className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto" ref={messagesRef}>
          {messages.map((msg, index)=>(
            <Message key={index} from={msg.from}>{msg.text}</Message>
          ))}
        </div>
        <form className="px-4 flex items-center bg-indigo-100" onSubmit={handleSubmit}>
          <input autoFocus value={text} onChange={(e) => setText(e.target.value)} type="text" className="bg-transparent py-6 outline-none text-indigo-700 placeholder:text-indigo-300 flex-1" placeholder="Escreva sua mensagem..."/>
          <button type="submit" className="text-indigo-700 bg-indigo-200 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M3 20V4l19 8zm2-3l11.85-5L5 7v3.5l6 1.5l-6 1.5zm0 0V7z"></path></svg>
          </button>
        </form>
      </div>
      <small className="mt-6 text-indigo-100 text-sm text-center">Desenvolvido por <a className="font-bold" target="_blank" href="https://youtube.com/nick3301">Nick</a> | Modelo utilizado: <a className="font-bold" href="https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Llama-70B" target="_blank">deepseek-r1-distill-llama-70b</a></small>
      <small className="mt-6 text-indigo-700 p-2 px-4 rounded-full bg-indigo-100 text-sm text-center">www.nickinho.com</small>
    </div>
  );
}
