import React from 'react';
import { TextInput } from 'react-native-paper';

type PTextInputProps = React.ComponentProps<typeof TextInput>;

export const PTextInput = (props: PTextInputProps) => <TextInput {...props} />;
