"use client";

export const MessageBank = 
[   
  {
    id: "0",
    role: "user",   
    successors: ["2", "8", "9"], 
    parts: [
      {
        type: "text",        
        text: "How many r's are in strawberry?"
      }
    ]
  },
  {
    id: "1",
    role: "user",      
    successors: ["3"],   
    parts: [
      {
        type: "text",   
        text: "How many w's are in oughwnmtherwqbyewcatwroad?"
      }
    ]
  },  
  { 
    id: "2",
    role: "assistant",
    successors: ["0", "1"], 
    parts: [
      {
        type: "text",
        text: "The word **\\\"strawberry\\\"** contains **three** letter \\\"r\\\"s.",
        state: "done"
      }
    ]
  },
  {
    id: "3",
    role: "assistant",
    successors: ["4", "5"], 
    parts: [
      {
        type: "text",
        text: "The string **\\\"oughwnmtherwqbyewcatwroad\\\"** contains **3** letter \\\"w\\\"s.",
        state: "done"
      }
    ]
  },
  {
    id: "4",
    role: "user",   
    successors: ["6"], 
    parts: [
      {
        type: "text",
        text: "Spell out the word 1 letter at a time and show the letters as you count them."
      }
    ]
  },  
  {
    id: "5",
    role: "user",   
    successors: ["7"], 
    parts: [
      {
        type: "text",
        text: "Are you sure?"
      }
    ]
  },   
  {
    id: "6",
    role: "assistant",   
    successors: ["0", "1"], 
    parts: [
      {
        type: "text",
        text: "Let's count the w's in the word \"oughwnmtherwqbyewcatwroad.\"  \n\nI'll spell it out one letter at a time and show each letter as I go:  \n\n**O U G H W N M T H E R W Q B Y E W C A T W R O A D .**  \n\nNow, let's count the w's:  \n\nThere are **4** \"w\"s."
      }
    ]
  },    
  {
    id: "7",
    role: "assistant",   
    successors: ["4", "0"], 
    parts: [
      {
        type: "text",
        text: "Yes, I'm sure. The string **\\\"oughwnmtherwqbyewcatwroad\\\"** contains **3** letter \\\"w\\\"s."
      }
    ]
  },  
  { 
    id: "8",
    role: "assistant",
    successors: ["0", "1"], 
    parts: [
      {
        type: "text",
        text: "There are 3 \\\"r\\\"s in **\\\"strawberry\\\"**",
        state: "done"
      }
    ]
  },  
  { 
    id: "9",
    role: "assistant",
    successors: ["0", "1"], 
    parts: [
      {
        type: "text",
        text: "Three",
        state: "done"
      }
    ]
  },        
]