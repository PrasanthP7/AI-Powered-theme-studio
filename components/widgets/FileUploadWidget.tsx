import React, { useRef } from "react";
import { UploadCloud } from "lucide-react";
import { WidgetData } from "../../types";
import { useTheme } from "../../context/ThemeContext";

interface Props {
  data: WidgetData;
  onResponse: (response: string) => void;
}

export const FileUploadWidget: React.FC<Props> = ({ data, onResponse }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();

  const bgColor = theme.chat_detail?.agent_msg_bg_color || theme.components?.botMessage?.backgroundColor || '#f3f4f6';
  const textColor = theme.chat_detail?.agent_msg_txt_color || theme.components?.botMessage?.textColor || '#1f2937';
  const borderColor = theme.chat_detail?.quickreply_menu_border_color || theme.colors?.neutral || '#e5e7eb';
  const accent = theme.chat_detail?.submit_btn_bg_color || theme.colors?.accent || '#2977e6';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTimeout(() => {
        onResponse(file.name);
      }, 500);
    }
  };

  return (
    <div
      className="p-4 rounded-theme shadow-theme w-full max-w-xs border"
      style={{ backgroundColor: bgColor, borderColor: borderColor }}
    >
      <h4 className="text-sm font-semibold mb-3" style={{ color: textColor }}>
        {data.title || "Upload Document"}
      </h4>

      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors"
        style={{ borderColor: accent }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = accent + "22")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
      >
        <UploadCloud size={32} color={accent} className="mb-2" />
        <span className="text-xs" style={{ color: textColor }}>
          Click to browse
        </span>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept={data.allowedTypes?.join(",")}
        onChange={handleFileChange}
      />
    </div>
  );
};
