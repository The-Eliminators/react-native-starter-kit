import React from 'react';
import { TextInput as NativeTextInput, TextInputProps, OpaqueColorValue, StyleProp, TextStyle } from 'react-native';

import { ThemeColors } from 'src/types/theme.type';
import { IconName } from 'src/types/iconName.type';

export type RenderProps = {
  ref: (a?: NativeTextInput | null) => void;
  onChangeText?: (a: string) => void;
  placeholder?: string;
  placeholderTextColor?: string | OpaqueColorValue;
  editable?: boolean;
  selectionColor?: string | OpaqueColorValue;
  onFocus?: (args: any) => void;
  onBlur?: (args: any) => void;
  style: StyleProp<TextStyle>;
  multiline?: boolean;
  numberOfLines?: number;
  value?: string;
  adjustsFontSizeToFit?: boolean;
};

export type TInput = {
  leftRender?: (props: SideRenderProps) => React.ReactNode;
  rightRender?: (props: SideRenderProps) => React.ReactNode;

  leftIcon?: IconName;
  rightIcon?: IconName;

  /** If true, user won't be able to interact with the component. */
  disabled?: boolean;

  /** If true, user won't be able to edit the component. */
  editable?: boolean;

  /** The text to use for the floating label. */
  label?: string;

  /** Placeholder for the input. */
  placeholder?: string; // can removed

  assistiveText?: string;

  /**  Whether to style the TextInput with error style. */
  error?: boolean;

  errorMessage?: string;

  /** Callback that is called when the text input's text changes. Changed text is passed as an argument to the callback handler. */
  onChangeText?: (text: string) => void;

  /** Whether the input can have multiple lines. */
  multiline?: boolean;

  /** The number of lines to show in the input (Android only). */
  numberOfLines?: number;

  /** Callback that is called when the text input is focused. */
  onFocus?: (args: any) => void;

  /** Callback that is called when the text input is blurred. */
  onBlur?: (args: any) => void;

  /** Callback to render a custom input component such as `react-native-text-input-mask` */
  render?: (props: RenderProps) => React.ReactNode;

  /**
   * Value of the text input.
   */
  value?: string;

  defaultValue?: string;
} & TextInputProps;

export type InputTextState = 'error' | 'disabled' | 'focused' | 'hasValue' | 'normal';

export type SideRenderProps = {
  color: keyof ThemeColors;
  state: InputTextState;
};

export type TextInputHandles = Pick<NativeTextInput, 'focus' | 'clear' | 'blur' | 'isFocused' | 'setNativeProps'>;

export type TStateColors = { [state: string]: { [color: string]: keyof ThemeColors } };
