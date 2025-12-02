import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MessageInput } from './MessageInput';
import { MessageList } from './MessageList';
import { Message } from '../../types';
import { sendMessageToGemini } from '../../services/geminiService';
import { useTheme } from '../../context/ThemeContext';
import { Sparkles } from 'lucide-react';

export const ChatWindow: React.FC = () => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      type: 'text',
      content: 'Hello! I am your AI assistant. I can help you with appointments, forms, or general questions. Try saying "I want to book an appointment" or "Show me shoes".',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleUserSend = async (text: string) => {
    // 1. Add User Message
    const userMsg: Message = {
      id: uuidv4(),
      role: 'user',
      type: 'text',
      content: text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // 2. Call AI
    const aiResponse = await sendMessageToGemini(messages.concat(userMsg), text);

    // 3. Add AI Message
    const botMsg: Message = {
      id: uuidv4(),
      role: 'model',
      type: aiResponse.type as any,
      content: aiResponse.content,
      widgetData: aiResponse.widgetData,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-md bg-white rounded-theme shadow-theme overflow-hidden border border-gray-200">
      {/* Header */}
      <div 
        className="px-4 py-3 flex items-center justify-between shadow-sm z-10"
        style={{
          backgroundColor: theme.header_bg_color || '#2977e6',
          color: theme.header_text_color || '#ffffff'
        }}
      >
        <div className="flex items-center gap-2">
          <Sparkles size={20} />
          <h1 className="font-semibold text-lg">AI Assistant</h1>
        </div>
        <div className="text-xs opacity-80">Online</div>
      </div>

      {/* Messages Area */}
      <MessageList 
        messages={messages} 
        onWidgetResponse={handleUserSend} 
        isTyping={isTyping} 
      />

      {/* Input Area */}
      <MessageInput onSend={handleUserSend} disabled={isTyping} />
    </div>
  );
};