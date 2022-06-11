import React, { useEffect, useState } from 'react';
import { TextInput as NativeTextInput, Animated } from 'react-native';

import Box from '../common/Box';
import Text from '../common/Text';
import typography from 'src/theme/typography';
import { getTextInputState } from './helper';
import { useTheme, useBoolean } from 'src/hooks';
import useLabelAnimationValue from './useLabelAnimationValue';
import type { InputHandles, TInput, TStateColors } from './types';

export const TextInputStateOnColors: TStateColors = {
  normal: {
    labelColor: 'onSurfaceMediumEmphasis',
    inputTextColor: 'onSurfaceHighEmphasis',
    underlineColor: 'onSurfaceLowEmphasis',
    assistiveTextColor: 'onSurfaceMediumEmphasis',
  },
  focused: {
    labelColor: 'primary',
    underlineColor: 'primary',
    assistiveTextColor: 'primary',
  },
  error: {
    labelColor: 'error',
    underlineColor: 'error',
    assistiveTextColor: 'error',
  },
  hasValue: {
    labelColor: 'onSurfaceDisableEmphasis',
  },
  disabled: {
    labelColor: 'onSurfaceDisableEmphasis',
    inputTextColor: 'onSurfaceDisableEmphasis',
    assistiveTextColor: 'onSurfaceDisableEmphasis',
  },
};

const TextInput = React.forwardRef<InputHandles, TInput>(
  (
    {
      render = props => <NativeTextInput {...props} />,
      onChangeText,
      editable = true,
      disabled = false,
      error = false,
      defaultValue,
      label,
      errorMessage,
      placeholder,
      assistiveText,
      onFocus,
      onBlur,
      leftRender,
      rightRender,
      style, // TextInput Style
      labelStyle,
      containerStyle,
      innerContainerStyle,
      inputStateOnColors,
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

    const state = getTextInputState(disabled, error, isFocused, hasValue);
    const { labelColor, underlineColor, assistiveTextColor, inputTextColor } = {
      ...TextInputStateOnColors.normal,
      ...TextInputStateOnColors[state],
      ...inputStateOnColors?.[state],
    };

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
      isFocused: () => root.current?.isFocused() || false,
      blur: () => root.current?.blur(),
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
      <>
        <Box
          minHeight={56}
          bg="onSurfaceOverlay"
          paddingHorizontal="xs"
          borderRadius={4}
          flexDirection="row"
          alignItems="center"
          style={containerStyle}>
          {leftRender && <Box paddingStart="m">{leftRender({ color: sideElementColor, state })}</Box>}
          <Box flex={1} style={innerContainerStyle}>
            {/* Label */}
            <Animated.View pointerEvents="none">
              <Animated.Text
                style={[
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    fontSize: labelAnimation.fontSize,
                    lineHeight: labelAnimation.lineHeight,
                    position: 'absolute',
                    top: labelAnimation.topHeight,
                    zIndex: 2,
                    paddingStart: 12,
                    color: colors[labelColor],
                  },
                  labelStyle,
                ]}>
                {label}
              </Animated.Text>
            </Animated.View>
            {/* TextInput */}
            {render({
              ref: tRef => (root.current = tRef),
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
              placeholderTextColor: colors.onSurfaceLowEmphasis,
              style: [
                typography.subtitle,
                {
                  color: colors[inputTextColor],
                  lineHeight: 24,
                  paddingStart: 12,
                  paddingBottom: 4,
                  paddingTop: 20,
                  textAlignVertical: 'center',
                },
                style, // textField style
              ],
              ...rest,
            })}
          </Box>
          {rightRender && <Box>{rightRender({ color: sideElementColor, state })}</Box>}
          <Animated.View
            style={[
              // eslint-disable-next-line react-native/no-inline-styles
              { position: 'absolute', left: 0, right: 0, bottom: 0, height: 2, zIndex: 1 },
              {
                backgroundColor: colors[underlineColor],
                transform: [{ scaleY: isFocused ? 1 : error ? 0.5 : 0 }],
              },
            ]}
          />
        </Box>
        {assistiveText && (
          <Text variant="caption" color={assistiveTextColor} marginStart="l" marginTop="xxs">
            {error ? errorMessage || assistiveText : assistiveText}
          </Text>
        )}
      </>
    );
  },
);

export default TextInput;
