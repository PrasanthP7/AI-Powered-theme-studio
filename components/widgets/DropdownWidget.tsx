
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
  
  const style = { ...theme.widgets.general, ...theme.widgets.dropdown };

  return (
    <div 
      className="p-3 rounded-theme shadow-theme w-full max-w-xs border"
      style={{ backgroundColor: style.backgroundColor, borderColor: style.borderColor }}
    >
      <label className="block text-xs font-medium mb-1" style={{ color: style.textColor }}>
        {data.title || "Choose an option"}
      </label>
      <select 
        onChange={(e) => onResponse(e.target.value)}
        className="block w-full text-sm rounded-md shadow-sm p-2 border focus:ring-opacity-50"
        style={{ 
          borderColor: theme.colors.neutral, 
          color: style.textColor,
          outlineColor: theme.colors.primary
        }}
        defaultValue=""
      >
        <option value="" disabled>Select...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
};
