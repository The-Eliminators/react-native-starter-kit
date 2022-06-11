import React from 'react';
import {
  TextInput as NativeTextInput,
  TextInputProps,
  OpaqueColorValue,
  StyleProp,
  TextStyle,
  ViewStyle,
  ScrollViewProps,
} from 'react-native';

import { ThemeColors } from 'src/theme/theme.type';

type RenderProps = {
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

  /** Value of the text input. */
  value?: string;

  defaultValue?: string;

  /** Style object */
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  innerContainerStyle?: StyleProp<ViewStyle>;

  /** onColors */
  inputStateOnColors?: InputStateOnColors;
} & TextInputProps;

export type TextInputState = 'error' | 'disabled' | 'focused' | 'hasValue' | 'normal';

type TextInputStateProperty = 'labelColor' | 'inputTextColor' | 'underlineColor' | 'assistiveTextColor';

type SideRenderProps = {
  color: keyof ThemeColors;
  state: TextInputState;
};

export type InputHandles = Pick<NativeTextInput, 'focus' | 'clear' | 'blur' | 'isFocused'>;

export type InputStateOnColors = {
  [state in TextInputState]?: { [property in TextInputStateProperty]?: keyof ThemeColors };
};

export type TStateColors = InputStateOnColors & {
  normal: { [property in TextInputStateProperty]: keyof ThemeColors };
};

type DropDownRenderProps<T> = {
  value?: T;
  placeholder?: string;
  placeholderTextColor?: string;
  style?: StyleProp<ViewStyle> | StyleProp<TextStyle>;
  state?: TextInputState;
};

export type DropDownProps<T> = {
  /** Item list */
  items: Array<T>;

  /** Value of the text input. */
  value?: T;
  defaultValue?: T;

  /** The text to use for the floating label. */
  label?: string;

  /** If true, user won't be able to interact with the component. */
  disabled?: boolean;

  /** Placeholder for the input. */
  placeholder?: string;

  assistiveText?: string;

  /**  Whether to style the TextInput with error style. */
  error?: boolean;

  errorMessage?: string;

  /** Render dropdown selected value  */
  render?: (props: DropDownRenderProps<T>) => React.ReactNode;

  /** Render Drop down item */
  renderItem?: (item: T, selected: boolean, index: number) => React.ReactNode;

  /** Callback that is called when user select the item */
  onItemSelect?: (item: T | undefined) => void;

  /** To display clean button which is useful when field is not required  */
  showClearButton?: boolean;

  /** Callback that is called when the text input is focused. */
  onFocus?: (args: any) => void;

  /** Callback that is called when the text input is blurred. */
  onBlur?: (args: any) => void;

  /** Style object */
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  innerContainerStyle?: StyleProp<ViewStyle>;
  dropDownContainerStyle?: StyleProp<ViewStyle>;

  scrollViewProps?: ScrollViewProps;

  /** onColors */
  inputStateOnColors?: InputStateOnColors;

  style?: StyleProp<ViewStyle>;

  leftRender?: (props: SideRenderProps) => React.ReactNode;
  rightRender?: (props: SideRenderProps) => React.ReactNode;
};
