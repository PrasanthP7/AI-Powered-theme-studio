
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
  
  // Resolve styles: specific widget override -> general widget -> default
  const style = {
    ...theme.widgets.general,
    ...theme.widgets.general, 
    // In a real app we might have theme.widgets.feedback, but defaulting to general for now
  };

  const handleRate = (r: number) => {
    setRating(r);
    setTimeout(() => onResponse(`Rated: ${r} stars`), 600);
  };

  return (
    <div 
      className="p-4 rounded-theme shadow-theme w-full max-w-xs text-center"
      style={{ 
        backgroundColor: style.backgroundColor, 
        borderColor: style.borderColor,
        borderWidth: '1px'
      }}
    >
      <h4 className="text-sm font-semibold mb-3" style={{ color: style.textColor }}>
        {data.title || "How was your experience?"}
      </h4>
      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRate(star)}
            className="transition-transform hover:scale-110 focus:outline-none"
          >
            <Star 
              size={24} 
              fill={star <= rating ? (style.accentColor || theme.colors.secondary) : "none"} 
              color={star <= rating ? (style.accentColor || theme.colors.secondary) : "#ccc"} 
            />
          </button>
        ))}
      </div>
    </div>
  );
};
