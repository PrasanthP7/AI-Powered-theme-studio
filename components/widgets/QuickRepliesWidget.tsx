
import React from 'react';
import { WidgetData } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface Props {
  data: WidgetData;
  onResponse: (response: string) => void;
}

export const QuickRepliesWidget: React.FC<Props> = ({ data, onResponse }) => {
  const options = data.options || ["Yes", "No"];
  const { theme } = useTheme();

  const style = { ...theme.widgets.general, ...theme.widgets.quickReplies };
  const primaryColor = style.accentColor || theme.colors.primary;

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onResponse(opt)}
          className="px-3 py-1.5 text-sm font-medium rounded-full transition-colors shadow-sm border"
          style={{ 
            backgroundColor: theme.colors.surface,
            borderColor: primaryColor,
            color: primaryColor,
          }}
          onMouseOver={(e) => {
             e.currentTarget.style.backgroundColor = primaryColor;
             e.currentTarget.style.color = '#ffffff';
          }}
          onMouseOut={(e) => {
             e.currentTarget.style.backgroundColor = theme.colors.surface;
             e.currentTarget.style.color = primaryColor;
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
};
