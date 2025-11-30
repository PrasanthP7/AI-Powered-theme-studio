
import React, { useState } from 'react';
import { WidgetData } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface Props {
  data: WidgetData;
  onResponse: (response: string) => void;
}

export const FormWidget: React.FC<Props> = ({ data, onResponse }) => {
  const fields = data.fields || [{ name: 'input', label: 'Input', type: 'text' }];
  const [values, setValues] = useState<Record<string, string>>({});
  const { theme } = useTheme();

  const style = { ...theme.widgets.general, ...theme.widgets.form };
  const accent = style.accentColor || theme.colors.primary;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onResponse(`Form Submitted: ${JSON.stringify(values)}`);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="p-4 rounded-theme shadow-theme space-y-3 w-full max-w-xs border"
      style={{ backgroundColor: style.backgroundColor, borderColor: style.borderColor }}
    >
      <h4 className="text-sm font-bold mb-2" style={{ color: style.textColor }}>
        {data.title || "Please fill details"}
      </h4>
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-xs font-medium" style={{ color: style.textColor }}>{field.label}</label>
          <input
            type={field.type}
            className="mt-1 block w-full rounded border p-1.5 text-sm"
            style={{ borderColor: theme.colors.neutral }}
            onChange={(e) => setValues({ ...values, [field.name]: e.target.value })}
            required
          />
        </div>
      ))}
      <button 
        type="submit"
        className="w-full py-1.5 rounded text-sm font-medium hover:opacity-90 transition-opacity text-white"
        style={{ backgroundColor: accent }}
      >
        Submit
      </button>
    </form>
  );
};
