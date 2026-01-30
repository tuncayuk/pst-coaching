import React from "react";
import { Surface } from "react-native-paper";

type PSurfaceProps = React.ComponentProps<typeof Surface>;

export const PSurface = (props: PSurfaceProps) => <Surface {...props} />;
