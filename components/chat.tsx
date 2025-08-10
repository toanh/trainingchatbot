"use client";

import { defaultModel, type modelID } from "@/ai/providers";
import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { Textarea } from "./textarea";
import { ProjectOverview } from "./project-overview";
import { Messages } from "./messages";
import { Header } from "./header";
import { toast } from "sonner";
import { SuggestedPrompts } from "./suggested-prompts";
import { MessageBank } from "@/data/messageBank";

interface SimulatedChatOptions {
  onError?: (error: Error) => void;
}

interface SimulatedMessage {
  id: string;
  role: "user" | "assistant";
  successors: string[];
  parts: Array<{
    type: string;
    text?: string;
  }>;
}

function useSimulatedChat(options: SimulatedChatOptions = {}, setCurrentMessageIDs: (ids: string[]) => void): {
  sendMessage: (msg: any, body: any) => void;
  messages: any[];
  status: "error" | "ready" | "streaming" | "submitted";
  stop: any;
} {
  const [simulatedMessages, setSimulatedMessages] = useState<SimulatedMessage[]>([]);

  const processSimulatedMessage = (msg: SimulatedMessage) => {
    setSimulatedMessages(prev => [...prev, msg]);
    // Simulate AI response
    setTimeout(() => {
      // find the response to this prompt, only get the first and only response
      const successor = msg.successors[Math.floor(Math.random() * msg.successors.length)];
      const responseMessage = MessageBank.filter(message => message.id === successor)[0];

      setSimulatedMessages(prev => [...prev, {
        id: responseMessage.id,
        role: "assistant",
        successors: responseMessage?.successors || [],
        parts: [{ type: "text", text: responseMessage.parts[0].text }],
        
      }]);

      if (responseMessage?.successors) {
        setCurrentMessageIDs(responseMessage.successors);
      }


    }, 1000);  
  }

  return {
    sendMessage: (msg, body) => {

      processSimulatedMessage({
        id: msg.id,
        role: "user",
        successors: msg.successors,
        parts: [{
          type: 'text',
          text: msg.text
        }]        
      });
    },
    messages: simulatedMessages,
    status: "ready" as const,
    stop: "testing"
  }
}

export default function Chat() {
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState<modelID>(defaultModel);
  const [currentMessageIDs, setCurrentMessageIDs] = useState<string[]>(["0", "1"]);
  //const { sendMessage, messages, status, stop } = useChat({
  const { sendMessage, messages, status, stop } = useSimulatedChat({
    onError: (error) => {
      toast.error(
        error.message.length > 0
          ? error.message
          : "An error occured, please try again later.",
        { position: "top-center", richColors: true },
      );
    },
  }, setCurrentMessageIDs);

  const isLoading = status === "streaming" || status === "submitted";

  const handleSuggestedPrompt = (msg: string, ID: string, successors: string[]) => {
    sendMessage({text: msg, id: ID, successors: successors}, {body: {selectedModel}});
  };
  
  return (
    <div className="h-dvh flex flex-col justify-center w-full stretch">
      <Header />
      {messages.length === 0 ? (
        
        <div className="max-w-xl mx-auto w-full">
          <ProjectOverview />        
        </div>
      ) : (
        <Messages messages={messages} isLoading={isLoading} status={status} />
      )}

      <div className="max-w-xl mx-auto w-full">
        <SuggestedPrompts sendMessage={handleSuggestedPrompt} messageIDs={currentMessageIDs}/> 
      </div>      
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ text: input, id: 0 }, { body: { selectedModel } });
          setInput("");
        }}
        className="pb-8 bg-white dark:bg-black w-full max-w-xl mx-auto px-4 sm:px-0"
      >
        

        <Textarea
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          handleInputChange={(e) => setInput(e.currentTarget.value)}
          input={input}
          isLoading={isLoading}
          status={status}
          stop={stop}
        />
      </form>
    </div>
  );
}
