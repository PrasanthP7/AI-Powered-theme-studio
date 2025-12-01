import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeConfig } from '../types';
import { DEFAULT_THEME } from '../constants';

interface ThemeContextType {
  theme: ThemeConfig;
  setPreviewTheme: (theme: ThemeConfig) => void;
  deployTheme: () => void;
  resetTheme: () => void;
  isCustom: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTheme, setActiveTheme] = useState<ThemeConfig>(DEFAULT_THEME);
  const [previewTheme, setPreviewThemeState] = useState<ThemeConfig | null>(null);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('chatbot_theme_config');
    if (saved) {
      try {
        setActiveTheme(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved theme", e);
      }
    }
  }, []);

  const setPreviewTheme = (theme: ThemeConfig) => {
    setPreviewThemeState(theme);
  };

  const deployTheme = () => {
    if (previewTheme) {
      setActiveTheme(previewTheme);
      localStorage.setItem('chatbot_theme_config', JSON.stringify(previewTheme));
      setPreviewThemeState(null);
    }
  };

  const resetTheme = () => {
    setActiveTheme(DEFAULT_THEME);
    setPreviewThemeState(null);
    localStorage.removeItem('chatbot_theme_config');
  };

  const currentTheme = previewTheme || activeTheme;

  // Apply CSS variables to root
  useEffect(() => {
    const root = document.documentElement;
    const colors = currentTheme.colors;
    
    root.style.setProperty('--theme-primary', colors.primary);
    root.style.setProperty('--theme-secondary', colors.secondary);
    root.style.setProperty('--theme-accent', colors.accent);
    root.style.setProperty('--theme-neutral', colors.neutral);
    root.style.setProperty('--theme-surface', colors.surface);
    root.style.setProperty('--theme-text-primary', colors.textPrimary || '#22232d');
    root.style.setProperty('--theme-text-inverse', colors.textInverse || '#ffffff');
    // Expose component-specific variables (header/footer etc.) so UI can bind to branding tokens
    root.style.setProperty('--theme-header-bg', currentTheme.components?.header?.backgroundColor || colors.primary);
    root.style.setProperty('--theme-header-text', currentTheme.components?.header?.textColor || (colors.textInverse || '#ffffff'));
    
    root.style.setProperty('--theme-radius', `${currentTheme.shapes.borderRadius}px`);
    root.style.setProperty('--theme-shadow', currentTheme.shapes.hasShadow ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none');
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ 
      theme: currentTheme, 
      setPreviewTheme, 
      deployTheme, 
      resetTheme,
      isCustom: !!previewTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
