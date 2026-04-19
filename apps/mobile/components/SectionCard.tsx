import React from 'react';
import { ViewStyle } from 'react-native';

import { PCard } from '.';

export type SectionCardProps = {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
};

/** Convenience wrapper — delegates to PCard's section layout. Use PCard directly for new code. */
export const SectionCard = ({ title, actionLabel, onAction, children, style }: SectionCardProps) => (
  <PCard sectionTitle={title} sectionActionLabel={actionLabel} onSectionAction={onAction} style={style}>
    {children}
  </PCard>
);
