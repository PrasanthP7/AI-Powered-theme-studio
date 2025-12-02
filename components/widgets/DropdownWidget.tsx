import React from 'react';
import { WidgetData } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface Props {
  data: WidgetData;
  onResponse: (response: string) => void;
}

export const DropdownWidget: React.FC<Props> = ({ data, onResponse }) => {
  const options = data.options || [];
  const { theme } = useTheme();

  const bgColor = theme.chat_detail?.list_bg_color || '#ffffff';
  const textColor = theme.chat_detail?.list_text_color || '#000000';
  const borderColor = theme.chat_detail?.quickreply_menu_border_color || '#e5e7eb';

  return (
    <div
      className="p-3 rounded-theme shadow-theme w-full max-w-xs border"
      style={{ backgroundColor: bgColor, borderColor: borderColor }}
    >
      <label className="block text-xs font-medium mb-1" style={{ color: textColor }}>
        {data.title || "Choose an option"}
      </label>

      <select
        onChange={(e) => {
          const selected = options.find(
            (opt: any) =>
              (typeof opt === "string" ? opt : opt.value) === e.target.value
          );

          const label =
            typeof selected === "string"
              ? selected
              : selected?.label;

          onResponse(label || "");
        }}
        className="block w-full text-sm rounded-md shadow-sm p-2 border"
        style={{
          borderColor: borderColor,
          color: textColor,
          backgroundColor: bgColor
        }}
        defaultValue=""
      >
        <option value="" disabled>Select...</option>

        {options.map((opt: any, index: number) => {
          const label = typeof opt === "string" ? opt : opt.label;
          const value = typeof opt === "string" ? opt : opt.value;
          return (
            <option key={value || index} value={value}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
