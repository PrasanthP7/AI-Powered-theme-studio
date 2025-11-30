
import React from 'react';
import { WidgetData } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface Props {
  data: WidgetData;
  onResponse: (response: string) => void;
}

export const CarouselWidget: React.FC<Props> = ({ data, onResponse }) => {
  const items = data.items || [];
  const { theme } = useTheme();
  
  const style = { ...theme.widgets.general, ...theme.widgets.carousel };
  const accent = style.accentColor || theme.colors.secondary;

  return (
    <div className="flex overflow-x-auto gap-3 py-2 px-1 max-w-full no-scrollbar">
      {items.map((item, idx) => (
        <div 
          key={idx} 
          className="flex-none w-40 rounded-theme shadow-theme overflow-hidden border flex flex-col"
          style={{ 
            backgroundColor: style.backgroundColor, 
            borderColor: style.borderColor 
          }}
        >
          <div className="h-24 bg-gray-200 w-full relative">
            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-2 flex-1 flex flex-col">
            <h5 className="text-sm font-bold truncate" style={{ color: style.textColor }}>{item.title}</h5>
            <p className="text-xs opacity-70 line-clamp-2 mb-2 flex-1" style={{ color: style.textColor }}>
              {item.description}
            </p>
            <button 
              onClick={() => onResponse(`Selected: ${item.title}`)}
              className="w-full mt-auto py-1 text-white text-xs rounded hover:brightness-110 transition-all"
              style={{ backgroundColor: accent }}
            >
              Select
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
