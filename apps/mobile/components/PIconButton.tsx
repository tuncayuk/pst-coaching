import React from 'react';
import { IconButton } from 'react-native-paper';

type PIconButtonProps = React.ComponentProps<typeof IconButton>;

// Enforce 48dp minimum touch target across the design system
const HIT_SLOP = { top: 4, bottom: 4, left: 4, right: 4 };

export const PIconButton = ({ hitSlop = HIT_SLOP, ...props }: PIconButtonProps) => (
  <IconButton hitSlop={hitSlop} {...props} />
);
