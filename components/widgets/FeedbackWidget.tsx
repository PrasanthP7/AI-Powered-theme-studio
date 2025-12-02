import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { WidgetData } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface Props {
  data: WidgetData;
  onResponse: (response: string) => void;
}

export const FeedbackWidget: React.FC<Props> = ({ data, onResponse }) => {
  const [rating, setRating] = useState(0);
  const { theme } = useTheme();

  const starColor = theme.chat_detail?.submit_btn_bg_color || theme.colors?.accent || '#2977e6';
  const bgColor = theme.chat_detail?.agent_msg_bg_color || theme.components?.botMessage?.backgroundColor || '#f3f4f6';
  const textColor = theme.chat_detail?.agent_msg_txt_color || theme.components?.botMessage?.textColor || '#1f2937';
  const borderColor = theme.chat_detail?.quickreply_menu_border_color || theme.colors?.neutral || '#e5e7eb';

  const handleRate = (r: number) => {
    setRating(r);
    setTimeout(() => onResponse(`Rated: ${r} stars`), 600);
  };

  return (
    <div
      className="p-4 rounded-theme shadow-theme w-full max-w-xs text-center"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
        borderWidth: '1px',
      }}
    >
      <h4
        className="text-sm font-semibold mb-3"
        style={{ color: textColor }}
      >
        {data.title || 'How was your experience?'}
      </h4>

      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            onClick={() => handleRate(s)}
            className="transition-transform hover:scale-110 focus:outline-none"
          >
            <Star
              size={28}
              fill={s <= rating ? starColor : 'none'}
              color={s <= rating ? starColor : '#aaa'}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
