import React from "react";
import { IconButton } from "react-native-paper";

type PIconButtonProps = React.ComponentProps<typeof IconButton>;

export const PIconButton = (props: PIconButtonProps) => <IconButton {...props} />;
