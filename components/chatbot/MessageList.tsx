import React, { useEffect, useRef } from 'react';
import { Message } from '../../types';
import { WidgetRenderer } from './WidgetRenderer';
import { useTheme } from '../../context/ThemeContext';
import { Bot, User } from 'lucide-react';

interface Props {
  messages: Message[];
  onWidgetResponse: (txt: string) => void;
  isTyping: boolean;
}

export const MessageList: React.FC<Props> = ({ messages, onWidgetResponse, isTyping }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
      {messages.map((msg) => {
        const isBot = msg.role === 'model';
        const msgStyle = isBot ? theme.components.botMessage : theme.components.userMessage;

        return (
          <div
  key={msg.id}
  className={`flex w-full ${isBot ? 'justify-start' : 'justify-end'}`}
>
  <div className="flex items-start gap-2 max-w-[80%]">
    
    {/* Avatar */}
    {isBot && (
      <div
  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
  style={{ backgroundColor: theme.colors.accent }}
>
  <Bot size={16} />
</div>

    )}

    {/* Message Bubble */}
    <div className="min-w-0 flex-1">
      {msg.content && (
        <div
          className="p-3 rounded-lg break-words"
          style={{
            backgroundColor: msgStyle.backgroundColor,
            color: msgStyle.textColor,
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
          }}
        >
          {msg.content}
        </div>
      )}

      {/* Widget (bot only) */}
      {isBot && msg.type !== 'text' && (
        <div className="mt-2 min-w-0">
          <WidgetRenderer
            type={msg.type}
            data={msg.widgetData}
            onResponse={onWidgetResponse}
          />
        </div>
      )}
    </div>

    
  </div>
</div>

        );;
      })}
      
      {isTyping && (
        <div className="flex justify-start w-full">
           <div className="flex items-center gap-2 ml-10">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
           </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
};