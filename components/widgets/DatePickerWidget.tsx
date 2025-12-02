import React from 'react';
import { format, addDays, startOfDay } from 'date-fns';
import { WidgetData } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface Props {
  data: WidgetData;
  onResponse: (response: string) => void;
}

const isPureWhite = (color?: string) => {
  if (!color) return false;
  const c = color.toLowerCase().replace(/\s/g, '');
  return c === '#ffffff' || c === 'white';
};

// Slightly darken white surfaces for better visibility
const getSafeSurface = (themeSurface: string) => {
  if (isPureWhite(themeSurface)) return '#D9D9D9'; // darker and always visible
  return themeSurface;
};

export const DatePickerWidget: React.FC<Props> = ({ data, onResponse }) => {
  const today = startOfDay(new Date());
  const dates = Array.from({ length: 6 }, (_, i) => addDays(today, i));
  const { theme } = useTheme();

  const bgColor = theme.chat_detail?.agent_msg_bg_color || '#f3f4f6';
  const textColor = theme.chat_detail?.agent_msg_txt_color || '#1f2937';
  const borderColor = theme.chat_detail?.quickreply_menu_border_color || '#e5e7eb';
  const hoverBg = theme.chat_detail?.submit_btn_bg_color || '#2977e6';
  const hoverText = theme.chat_detail?.submit_btn_text_color || '#ffffff';

  return (
    <div
      className="p-3 rounded-theme shadow-theme w-full max-w-xs border"
      style={{ backgroundColor: bgColor, borderColor }}
    >
      <h4 className="text-sm font-semibold mb-2" style={{ color: textColor }}>
        {data.title || 'Select a Date'}
      </h4>

      <div className="grid grid-cols-3 gap-2">
        {dates.map((date) => (
          <button
            key={date.toISOString()}
            onClick={() => onResponse(format(date, 'yyyy-MM-dd'))}
            className="p-2 text-xs border rounded transition-colors text-center"
            style={{
              borderColor,
              backgroundColor: bgColor,
              color: textColor,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = hoverBg;
              e.currentTarget.style.color = hoverText;
              e.currentTarget.style.borderColor = hoverBg;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = bgColor;
              e.currentTarget.style.color = textColor;
              e.currentTarget.style.borderColor = borderColor;
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
