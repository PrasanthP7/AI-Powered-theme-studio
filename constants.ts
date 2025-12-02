
import { ThemeConfig } from './types';

export const DEFAULT_THEME: ThemeConfig = {
  colors: {
    primary: "#2977e6",
    secondary: "#d6813d",
    accent: "#2977e6",
    neutral: "#cdcdd0",
    surface: "#ffffff",
    textPrimary: "#22232d",
    textInverse: "#ffffff"
  },
  shapes: {
    borderRadius: 8,
    hasShadow: true
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px"
  },
  components: {
    header: {
      backgroundColor: "#2977e6",
      textColor: "#ffffff"
    },
    footer: {
      backgroundColor: "#ffffff",
      borderColor: "#e5e7eb"
    },
    userMessage: {
      backgroundColor: "#2977e6",
      textColor: "#ffffff"
    },
    botMessage: {
      backgroundColor: "#f3f4f6",
      textColor: "#1f2937"
    }
  },
  widgets: {
    general: {
      backgroundColor: "#ffffff",
      borderColor: "#e5e7eb",
      textColor: "#1f2937",
      accentColor: "#2977e6"
    },
    // Default specific overrides can be empty, inheriting from general or global colors
    datePicker: {},
    carousel: {},
    quickReplies: {},
    form: {},
    dropdown: {}
  },

  // New API format properties
  header_bg_color: "#2977e6",
  header_text_color: "#ffffff",
  quickreply_btn_bg_color: "#ffffff",
  quickreply_btn_txt_color: "#2977e6",
  chat_detail: {
    submit_btn_text_color: "#ffffff",
    submit_btn_bg_color: "#2977e6",
    agent_msg_bg_color: "#f3f4f6",
    user_msg_bg_color: "#2977e6",
    user_msg_txt_color: "#ffffff",
    agent_msg_txt_color: "#1f2937",
    quickreply_btn_txt_color: "#2977e6",
    quickreply_btn_bg_color: "#ffffff",
    quickreply_btn_border_color: "#e5e7eb",
    list_text_color: "#1f2937",
    list_bg_color: "#ffffff",
    quickreply_menu_border_color: "#e5e7eb"
  }
};

