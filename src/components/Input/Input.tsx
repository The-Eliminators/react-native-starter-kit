import React, { FC, useEffect, useRef, useState } from 'react';
import { TextInput, TextInputProps, Animated, Easing } from 'react-native';

import Box from '../common/Box';
import Text from '../common/Text';
import { useTheme } from 'src/hooks';
import typography from 'src/theme/typography';
import useBoolean from 'src/hooks/useBoolean';
import { ThemeColors } from 'src/types/theme.type';

const getLabelAnimation = (animatedObj: Animated.Value, toValue: number) => {
  return Animated.timing(animatedObj, {
    toValue,
    duration: 100,
    easing: Easing.linear,
    useNativeDriver: false,
  });
};

const StateColors: { [state: string]: { [color: string]: keyof ThemeColors } } = {
  normal: {
    labelColor: 'onSurfaceMediumEmphasis',
    inputTextColor: 'onSurfaceHighEmphasis',
    underlineColor: 'onSurfaceLowEmphasis',
    assistiveTextColor: 'onSurfaceMediumEmphasis',
  },
  focused: {
    labelColor: 'primary',
    inputTextColor: 'onSurfaceHighEmphasis',
    underlineColor: 'primary',
    assistiveTextColor: 'primary',
  },
  error: {
    labelColor: 'error',
    inputTextColor: 'onSurfaceHighEmphasis',
    underlineColor: 'error',
    assistiveTextColor: 'error',
  },
  hasValue: {
    labelColor: 'onSurfaceDisableEmphasis',
    inputTextColor: 'onSurfaceHighEmphasis',
    underlineColor: 'onSurfaceLowEmphasis',
    assistiveTextColor: 'onSurfaceMediumEmphasis',
  },
  disabled: {
    labelColor: 'onSurfaceDisableEmphasis',
    inputTextColor: 'onSurfaceDisableEmphasis',
    underlineColor: 'onSurfaceDisableEmphasis',
    assistiveTextColor: 'onSurfaceDisableEmphasis',
  },
};

type TInput = {
  left?: React.ReactNode;
  right?: React.ReactNode;

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

  /** Selection color of the input */
  selectionColor?: keyof ThemeColors;

  /** Whether the input can have multiple lines. */
  multiline?: boolean;

  /** The number of lines to show in the input (Android only). */
  numberOfLines?: number;

  /** Callback that is called when the text input is focused. */
  onFocus?: (args: any) => void;

  /** Callback that is called when the text input is blurred. */
  onBlur?: (args: any) => void;

  /** Callback to render a custom input component such as `react-native-text-input-mask` */
  render?: (props: TextInputProps) => React.ReactNode;

  /**
   * Value of the text input.
   */
  value?: string;

  defaultValue?: string;
};

const Input: FC<TInput> = ({
  render = props => <TextInput {...props} />,
  onChangeText,
  editable = true,
  disabled = false,
  defaultValue,
  label,
  error,
  errorMessage,
  placeholder,
  assistiveText,
  onFocus,
  onBlur,
  ...rest
}) => {
  const { colors } = useTheme();
  const isControlled = rest.value !== undefined;
  const validInputValue = isControlled ? rest.value : defaultValue;

  const [uncontrolledValue, setUncontrolledValue] = useState<string | undefined>(validInputValue);
  // Use value from props instead of local state when input is controlled
  const value = isControlled ? rest.value : uncontrolledValue;
  const hasValue = !!value; // To avoid multiple runs of useEffect whenever value changed

  const fontSize = useRef(new Animated.Value(hasValue ? 12 : 16)).current;
  const topHeight = useRef(new Animated.Value(hasValue ? 8 : 16)).current;
  const lineHeight = useRef(new Animated.Value(hasValue ? 16 : 24)).current;

  const { value: isFocused, setTrue: focus, setFalse: blur } = useBoolean(false);

  const state = disabled ? 'disabled' : error ? 'error' : isFocused ? 'focused' : value ? 'hasValue' : 'normal';
  const { labelColor, underlineColor, assistiveTextColor, inputTextColor } = StateColors[state];

  useEffect(() => {
    if (!hasValue) {
      if (isFocused && fontSize && topHeight && lineHeight) {
        Animated.parallel([
          getLabelAnimation(fontSize, 12),
          getLabelAnimation(topHeight, 8),
          getLabelAnimation(lineHeight, 16),
        ]).start();
      } else {
        Animated.parallel([
          getLabelAnimation(fontSize, 16),
          getLabelAnimation(topHeight, 16),
          getLabelAnimation(lineHeight, 24),
        ]).start();
      }
    }
  }, [isFocused, fontSize, topHeight, lineHeight, hasValue]);

  const handleChangeText = (currentValue: string) => {
    if (!editable || disabled) {
      return;
    }
    if (!isControlled) {
      // Keep track of value in local state when input is not controlled
      setUncontrolledValue(currentValue);
    }
    onChangeText?.(currentValue);
  };

  return (
    <Box width="100%">
      <Box
        height={56}
        bg={'onSurfaceOverlay'}
        paddingStart="xs"
        borderTopStartRadius={4}
        borderTopEndRadius={4}
        justifyContent="flex-end">
        {/* Label */}
        <Animated.Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            fontSize: fontSize,
            lineHeight: lineHeight,
            position: 'absolute',
            top: topHeight,
            zIndex: 2,
            paddingStart: 16,
            color: colors[labelColor],
          }}>
          {label}
        </Animated.Text>
        {/* TextInput */}
        {render({
          value,
          placeholder: isFocused ? placeholder : '',
          editable: !disabled && editable,
          onFocus: e => {
            focus();
            onFocus?.(e);
          },
          onBlur: e => {
            blur();
            onBlur?.(e);
          },
          onChangeText: handleChangeText,
          selectionColor: colors.primary,
          placeholderTextColor: colors.onSurfaceMediumEmphasis,
          style: [
            typography.subtitle,
            {
              color: colors[inputTextColor],
              paddingStart: 12,
              paddingBottom: 8,
              textAlignVertical: 'bottom',
            },
          ],
        })}
        <Animated.View
          style={[
            // eslint-disable-next-line react-native/no-inline-styles
            { position: 'absolute', left: 0, right: 0, bottom: 0, height: 2, zIndex: 1 },
            {
              backgroundColor: colors[underlineColor],
              transform: [{ scaleY: isFocused ? 1 : 0.5 }],
            },
          ]}
        />
      </Box>
      {assistiveText && (
        <Text variant="caption" color={assistiveTextColor} marginStart="l" marginTop="xxs">
          {errorMessage || assistiveText}
        </Text>
      )}
    </Box>
  );
};

export default Input;
