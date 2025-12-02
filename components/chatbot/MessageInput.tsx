import React, { useState } from 'react';
import { SendHorizontal } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface Props {
  onSend: (text: string) => void;
  disabled: boolean;
}

export const MessageInput: React.FC<Props> = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');
  const { theme } = useTheme();

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div 
      className="p-4 border-t bg-white"
    >
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={disabled}
          className="flex-1 p-3 text-sm border border-gray-300 rounded-theme focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
        <button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="p-3 rounded-theme hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-theme"
          style={{
            backgroundColor: theme.chat_detail?.submit_btn_bg_color || '#2977e6',
            color: theme.chat_detail?.submit_btn_text_color || '#ffffff'
          }}
          aria-label="Send message"
        >
          <SendHorizontal size={20} />
        </button>
      </div>
    </div>
  );
};