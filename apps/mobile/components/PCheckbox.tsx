import React from "react";
import { Checkbox } from "react-native-paper";

type PCheckboxProps = React.ComponentProps<typeof Checkbox>;

export const PCheckbox = (props: PCheckboxProps) => <Checkbox {...props} />;
