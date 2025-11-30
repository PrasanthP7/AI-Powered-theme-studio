import React from 'react';
import { format, addDays, startOfDay } from 'date-fns';
import { WidgetData } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface Props {
  data: WidgetData;
  onResponse: (response: string) => void;
}

export const DatePickerWidget: React.FC<Props> = ({ data, onResponse }) => {
  const today = startOfDay(new Date());
  const dates = Array.from({ length: 6 }, (_, i) => addDays(today, i));
  const { theme } = useTheme();

  // Merge general widget style with datePicker specific override
  const style = { ...theme.widgets.general, ...theme.widgets.datePicker };
  const accent = style.accentColor || theme.colors.primary;

  return (
    <div 
      className="p-3 rounded-theme shadow-theme w-full max-w-xs border"
      style={{ 
        backgroundColor: style.backgroundColor, 
        borderColor: style.borderColor 
      }}
    >
      <h4 className="text-sm font-semibold mb-2" style={{ color: style.textColor }}>
        {data.title || "Select a Date"}
      </h4>
      <div className="grid grid-cols-3 gap-2">
        {dates.map((date) => (
          <button
            key={date.toISOString()}
            onClick={() => onResponse(format(date, 'yyyy-MM-dd'))}
            className="p-2 text-xs border rounded transition-colors text-center"
            style={{ 
              borderColor: theme.colors.neutral,
              color: style.textColor
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = accent;
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = style.textColor || '#000';
            }}
          >
            <div className="font-bold">{format(date, 'd')}</div>
            <div className="text-[10px] opacity-80">{format(date, 'MMM')}</div>
          </button>
        ))}
      </div>
    </div>
  );
};