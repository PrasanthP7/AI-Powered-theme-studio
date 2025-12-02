import React from "react";
import { WidgetData } from "../../types";
import { useTheme } from "../../context/ThemeContext";

interface Props {
  data: WidgetData;
  onResponse: (response: string) => void;
}
export const QuickRepliesWidget: React.FC<Props> = ({ data, onResponse }) => {
  const options = data.options || [{ title: "Yes", value: "yes" }];
  const { theme } = useTheme();

  const bg = theme.chat_detail?.quickreply_btn_bg_color || theme.quickreply_btn_bg_color || '#ffffff';
  const textColor = theme.chat_detail?.quickreply_btn_txt_color || theme.quickreply_btn_txt_color || '#2977e6';
  const borderColor = theme.chat_detail?.quickreply_btn_border_color || textColor;

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {options.map((opt, index) => {
        const label = typeof opt === "string" ? opt : opt.title;
        return (
          <button
            key={label + index}
            onClick={() => onResponse(label)}
            className="px-3 py-1.5 text-sm font-medium rounded-full transition-colors shadow-sm border"
            style={{
              backgroundColor: bg,
              borderColor: borderColor,
              color: textColor
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = textColor;
              e.currentTarget.style.color = bg;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = bg;
              e.currentTarget.style.color = textColor;
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

