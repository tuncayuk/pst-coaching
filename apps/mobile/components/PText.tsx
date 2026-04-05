import React from 'react';
import { Text } from 'react-native-paper';

type PTextProps = React.ComponentProps<typeof Text>;

export const PText = (props: PTextProps) => <Text {...props} />;
