"use client";

import { motion } from "motion/react";
import { Button } from "./ui/button";

import { MessageBank } from "@/data/messageBank";

interface SuggestedPromptsProps {
  sendMessage: (input: string, id: string, successors: string[]) => void;
  messageIDs: string[];
}

function PureSuggestedPrompts({ sendMessage, messageIDs }: SuggestedPromptsProps) {
  const suggestedActions = MessageBank
    .filter(message => messageIDs.includes(message.id))
    .map(message => ({
      id: message.id,
      title: message.parts[0].text?.split(' ').slice(0, 4).join(' ') || '',
      label: message.parts[0].text?.split(' ').slice(4).join(' ') || '',
      action: message.parts[0].text || '',
      successors: message.successors || []}
    ));
  
  return (
    <div
      data-testid="suggested-actions"
      //className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full my-5"
      className="grid gap-2 w-full my-5"
      style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', maxWidth: '100%'}}
    >
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className={index > 1 ? "hidden sm:block" : "block"}
        >
          <Button
            variant="ghost"
            onClick={async () => {
              sendMessage(suggestedAction.action, suggestedAction.id, suggestedAction.successors);
            }}
            //className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
            className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-full justify-start items-start whitespace-normal break-words"
          >
            <span className="font-medium">{suggestedAction.title}</span>
            <span className="text-muted-foreground">
              {suggestedAction.label}
            </span>
          </Button>
        </motion.div>
      ))}      
    </div>
  );
}

export const SuggestedPrompts = PureSuggestedPrompts;
