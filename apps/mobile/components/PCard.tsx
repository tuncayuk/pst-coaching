import React from 'react';
import { Card } from 'react-native-paper';

type PCardProps = React.ComponentProps<typeof Card>;

type PCardComponent = ((props: PCardProps) => JSX.Element) & {
  Title: typeof Card.Title;
  Content: typeof Card.Content;
  Actions: typeof Card.Actions;
  Cover: typeof Card.Cover;
};

const BasePCard = (props: PCardProps) => <Card {...props} />;

export const PCard = Object.assign(BasePCard, {
  Title: Card.Title,
  Content: Card.Content,
  Actions: Card.Actions,
  Cover: Card.Cover
}) as PCardComponent;
