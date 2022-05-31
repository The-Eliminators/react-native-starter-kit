import React, { useEffect, useState } from 'react';
import { TextInput as NativeTextInput, Animated } from 'react-native';

import Box from '../common/Box';
import Text from '../common/Text';
import { useTheme } from 'src/hooks';
import typography from 'src/theme/typography';
import useBoolean from 'src/hooks/useBoolean';
import useLabelAnimationValue from './useLabelAnimationValue';
import type { InputTextState, TextInputHandles, TInput, TStateColors } from './types';

const StateColors: TStateColors = {
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

const TextInput = React.forwardRef<TextInputHandles, TInput>(
  (
    {
      render = props => <NativeTextInput {...props} />,
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
      multiline,
      numberOfLines,
      leftRender,
      rightRender,
      ...rest
    },
    ref,
  ) => {
    const { colors } = useTheme();
    const isControlled = rest.value !== undefined;
    const validInputValue = isControlled ? rest.value : defaultValue;

    const root = React.useRef<NativeTextInput | undefined | null>();

    const [uncontrolledValue, setUncontrolledValue] = useState<string | undefined>(validInputValue);
    // Use value from props instead of local state when input is controlled
    const value = isControlled ? rest.value : uncontrolledValue;
    const hasValue = !!value; // To avoid multiple runs of useEffect whenever value update
    const { value: isFocused, setTrue: focus, setFalse: blur } = useBoolean(false);

    const state: InputTextState = disabled
      ? 'disabled'
      : error
      ? 'error'
      : isFocused
      ? 'focused'
      : hasValue
      ? 'hasValue'
      : 'normal';
    const { labelColor, underlineColor, assistiveTextColor, inputTextColor } = StateColors[state];
    const sideElementColor = disabled ? 'onSurfaceDisableEmphasis' : 'onSurfaceMediumEmphasis';

    // Label Animation props
    const { activate, deactivate, ...labelAnimation } = useLabelAnimationValue({ activated: hasValue });

    useEffect(() => {
      if (!hasValue) {
        if (isFocused) {
          activate();
        } else {
          deactivate();
        }
      }
    }, [isFocused, hasValue, activate, label, deactivate]);

    React.useImperativeHandle(ref, () => ({
      focus: () => root.current?.focus(),
      clear: () => root.current?.clear(),
      setNativeProps: (args: Object) => root.current?.setNativeProps(args),
      isFocused: () => root.current?.isFocused() || false,
      blur: () => root.current?.blur(),
      forceFocus: () => root.current?.focus(),
    }));

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
          minHeight={56}
          bg="onSurfaceOverlay"
          paddingStart="xs"
          borderTopStartRadius={4}
          borderTopEndRadius={4}
          flexDirection="row"
          alignItems="center">
          {leftRender && <Box paddingStart="m">{leftRender({ color: sideElementColor, state })}</Box>}
          <Box minHeight={56} flex={1} justifyContent="flex-end">
            {/* Label */}
            <Animated.View pointerEvents="none">
              <Animated.Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  fontSize: labelAnimation.fontSize,
                  lineHeight: labelAnimation.lineHeight,
                  position: 'absolute',
                  top: labelAnimation.topHeight,
                  zIndex: 2,
                  paddingStart: 12,
                  color: colors[labelColor],
                }}>
                {label}
              </Animated.Text>
            </Animated.View>
            {/* TextInput */}
            {render({
              ref: tRef => (root.current = tRef),
              value,
              multiline,
              numberOfLines,
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
                  paddingTop: 20,
                  textAlignVertical: 'bottom',
                },
              ],
              ...rest,
            })}
          </Box>
          {rightRender && <Box paddingEnd="m">{rightRender({ color: sideElementColor, state })}</Box>}
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
            {error ? errorMessage + '' : assistiveText}
          </Text>
        )}
      </Box>
    );
  },
);

export default TextInput;
