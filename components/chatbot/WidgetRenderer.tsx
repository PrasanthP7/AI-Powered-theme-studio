
import React from 'react';
import { WidgetType, WidgetData } from '../../types';
import { DatePickerWidget } from '../widgets/DatePickerWidget';
import { QuickRepliesWidget } from '../widgets/QuickRepliesWidget';
import { DropdownWidget } from '../widgets/DropdownWidget';
import { CarouselWidget } from '../widgets/CarouselWidget';
import { FormWidget } from '../widgets/FormWidget';
import { FeedbackWidget } from '../widgets/FeedbackWidget';
import { FileUploadWidget } from '../widgets/FileUploadWidget';

interface Props {
  type: WidgetType;
  data?: WidgetData;
  onResponse: (txt: string) => void;
}

export const WidgetRenderer: React.FC<Props> = ({ type, data, onResponse }) => {
  const safeData = data || {};

  switch (type) {
    case 'date_picker':
      return <DatePickerWidget data={safeData} onResponse={onResponse} />;
    case 'quick_replies':
      return <QuickRepliesWidget data={safeData} onResponse={onResponse} />;
    case 'dropdown':
      return <DropdownWidget data={safeData} onResponse={onResponse} />;
    case 'carousel':
      return <CarouselWidget data={safeData} onResponse={onResponse} />;
    case 'form':
      return <FormWidget data={safeData} onResponse={onResponse} />;
    case 'feedback':
      return <FeedbackWidget data={safeData} onResponse={onResponse} />;
    case 'file_upload':
      return <FileUploadWidget data={safeData} onResponse={onResponse} />;
    case 'text':
    default:
      return null;
  }
};
