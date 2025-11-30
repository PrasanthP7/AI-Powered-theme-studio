
import React, { useRef } from 'react';
import { UploadCloud } from 'lucide-react';
import { WidgetData } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface Props {
  data: WidgetData;
  onResponse: (response: string) => void;
}

export const FileUploadWidget: React.FC<Props> = ({ data, onResponse }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();

  // Determine specific style
  const style = theme.widgets.general; 
  const accent = style.accentColor || theme.colors.primary;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate upload delay
      setTimeout(() => {
        onResponse(`Uploaded file: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
      }, 1000);
    }
  };

  return (
    <div 
      className="p-4 rounded-theme shadow-theme w-full max-w-xs"
      style={{ backgroundColor: style.backgroundColor, border: `1px solid ${style.borderColor}` }}
    >
      <h4 className="text-sm font-semibold mb-3" style={{ color: style.textColor }}>{data.title || "Upload Document"}</h4>
      
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
        style={{ borderColor: theme.colors.neutral }}
      >
        <UploadCloud size={32} color={accent} className="mb-2" />
        <span className="text-xs text-gray-500">Click to browse</span>
      </div>
      
      <input 
        type="file" 
        className="hidden" 
        ref={fileInputRef}
        accept={data.allowedTypes?.join(',')}
        onChange={handleFileChange}
      />
    </div>
  );
};
