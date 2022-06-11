import React, { useCallback, useEffect, useState } from 'react';
import { TextInput as NativeTextInput, Animated } from 'react-native';

import Box from '../common/Box';
import Text from '../common/Text';
import AppIcon from '../Icon/AppIcon';
import Surface from '../common/Surface';
import DropDownItem from './DropDownItem';
import Touchable from '../Button/Touchable';
import { getTextInputState } from './helper';
import typography from 'src/theme/typography';
import ScrollView from '../common/ScrollView';
import { useTheme, useBoolean } from 'src/hooks';
import useLabelAnimationValue from './useLabelAnimationValue';
import type { InputHandles, TStateColors, DropDownProps } from './types';

export const TextInputStateOnColors: TStateColors = {
  normal: {
    labelColor: 'onSurfaceMediumEmphasis',
    inputTextColor: 'onSurfaceHighEmphasis',
    underlineColor: 'onSurfaceLowEmphasis',
    assistiveTextColor: 'onSurfaceMediumEmphasis',
  },
  focused: {
    // labelColor: 'primary',
    // underlineColor: 'primary',
    // assistiveTextColor: 'primary',
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

function DropDown<T extends { id: number; label: string }>(
  {
    render = ({ value, ...props }) => <NativeTextInput value={value?.label} editable={false} {...props} />,
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
    rightRender = ({ color, state }) => (
      // eslint-disable-next-line react-native/no-inline-styles
      <AppIcon name={state === 'focused' ? 'minus' : 'plus'} size={16} color={color} style={{ marginEnd: 16 }} />
    ),
    style, // TextInput Style
    labelStyle,
    containerStyle,
    innerContainerStyle,
    inputStateOnColors,
    items,
    renderItem = (item, selected) => (
      <DropDownItem label={item.label} selected={selected} color={selected ? 'onSurfaceHighEmphasis' : undefined} />
    ),
    onItemSelect,
    dropDownContainerStyle,
    scrollViewProps,
    showClearButton = true,
    ...rest
  }: DropDownProps<T>,
  ref: React.ForwardedRef<InputHandles>,
) {
  const { colors } = useTheme();
  const isControlled = rest.value !== undefined;
  const validInputValue = isControlled ? rest.value : defaultValue;

  const [uncontrolledValue, setUncontrolledValue] = useState<T | undefined>(validInputValue);
  // Use value from props instead of local state when input is controlled
  const value = isControlled ? rest.value : uncontrolledValue;
  const hasValue = !!value; // To avoid multiple runs of useEffect whenever value update
  const { value: isFocused, setFalse: blur, setTrue: focus, toggle: toggleFocus } = useBoolean(false);

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
    // label animation
    if (hasValue || (isFocused && placeholder)) {
      activate();
    } else {
      deactivate();
    }
  }, [hasValue, activate, label, deactivate, isFocused, placeholder]);

  React.useImperativeHandle(ref, () => ({
    focus: () => {
      focus();
      onFocus?.(null);
    },
    clear: () => handleItemSelection(undefined),
    isFocused: () => isFocused,
    blur: () => blur(),
  }));

  const handleItemSelection = (item?: T) => {
    if (!isControlled) {
      // Keep track of value in local state when input is not controlled
      setUncontrolledValue(item);
    }
    onItemSelect?.(item);
    blur();
    onBlur?.(null);
  };

  const handleOnClick = useCallback(() => {
    toggleFocus();
    isFocused ? onBlur?.(null) : onFocus?.(null);
  }, [toggleFocus, isFocused, onBlur, onFocus]);

  return (
    <>
      <Touchable
        minHeight={56}
        bg="onSurfaceOverlay"
        paddingHorizontal="xs"
        borderRadius={4}
        flexDirection="row"
        alignItems="center"
        style={containerStyle}
        onPress={handleOnClick}
        disabled={disabled}>
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

          {render({
            value,
            placeholder: isFocused ? placeholder : '',
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
              style,
            ],
            state: state,
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
      </Touchable>
      {isFocused && (
        <Surface
          borderBottomStartRadius={4}
          borderBottomEndRadius={4}
          elevation={3}
          marginTop="xs"
          zIndex={1000}
          paddingVertical="s"
          maxHeight={150}
          style={dropDownContainerStyle}>
          <ScrollView nestedScrollEnabled persistentScrollbar keyboardShouldPersistTaps="handled" {...scrollViewProps}>
            {items.map((item, index) => (
              <Touchable onPress={() => handleItemSelection(item)} key={`render=${index}`}>
                {renderItem(item, item.id === value?.id, index)}
              </Touchable>
            ))}
            {value && showClearButton && (
              <Touchable onPress={() => handleItemSelection(undefined)}>
                <Box height={24} paddingStart="l" paddingEnd="xxl" alignItems="center" justifyContent="center">
                  <Text variant={'caption'} color="error">
                    Clear Selection
                  </Text>
                </Box>
              </Touchable>
            )}
          </ScrollView>
        </Surface>
      )}
      {assistiveText && !isFocused && (
        <Text variant="caption" color={assistiveTextColor} marginStart="l" marginTop="xxs">
          {error ? errorMessage || assistiveText : assistiveText}
        </Text>
      )}
    </>
  );
}

export default React.forwardRef(DropDown);
