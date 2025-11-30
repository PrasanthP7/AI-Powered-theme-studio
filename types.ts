
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  surface: string;
  textPrimary: string;
  textInverse: string;
}

export interface ThemeShapes {
  borderRadius: number; // in px
  hasShadow: boolean;
}

export interface ComponentStyle {
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  accentColor?: string;
}

export interface ThemeConfig {
  colors: ThemeColors;
  shapes: ThemeShapes;
  typography: {
    fontFamily: string;
    fontSize: string;
  };
  // Granular overrides
  components: {
    header: ComponentStyle;
    footer: ComponentStyle;
    userMessage: ComponentStyle;
    botMessage: ComponentStyle;
  };
  // Specific Widget overrides
  widgets: {
    general: ComponentStyle; // Fallback
    datePicker?: ComponentStyle;
    carousel?: ComponentStyle;
    quickReplies?: ComponentStyle;
    form?: ComponentStyle;
    dropdown?: ComponentStyle;
  };
}

export type WidgetType = 
  | 'text' 
  | 'date_picker' 
  | 'form' 
  | 'carousel' 
  | 'quick_replies' 
  | 'dropdown'
  | 'feedback'
  | 'file_upload';

export interface WidgetData {
  title?: string;
  options?: string[];
  fields?: { name: string; label: string; type: string }[];
  items?: { title: string; description: string; imageUrl: string }[];
  allowedTypes?: string[]; // for file upload
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  type: WidgetType;
  content: string;
  widgetData?: WidgetData;
  timestamp: Date;
}
