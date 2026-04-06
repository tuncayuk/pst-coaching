import React from 'react';
import { TextInput } from 'react-native-paper';

type PTextInputProps = React.ComponentProps<typeof TextInput>;

export const PTextInput = ({ mode = 'outlined', ...props }: PTextInputProps) => <TextInput mode={mode} {...props} />;
