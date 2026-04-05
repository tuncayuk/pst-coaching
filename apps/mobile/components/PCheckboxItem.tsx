import React from 'react';
import { Checkbox } from 'react-native-paper';

type PCheckboxItemProps = React.ComponentProps<typeof Checkbox.Item>;

export const PCheckboxItem = (props: PCheckboxItemProps) => <Checkbox.Item {...props} />;
