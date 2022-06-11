import React, { ReactNode, useCallback, useState } from 'react';
import { ScrollViewProps, StyleProp, View, ViewStyle } from 'react-native';

import TextInput from './TextInput';
import Surface from '../common/Surface';
import DropDownItem from './DropDownItem';
import Touchable from '../Button/Touchable';
import ScrollView from '../common/ScrollView';
import { InputHandles, TInput } from './types';

type Props<T> = {
  items: Array<T>;
  onItemSelect?: (item: T) => void;
  renderItem?: (item: T, index: number) => ReactNode;
  filter?: (item: T, searchText: string) => boolean;
  suggestionBoxStyle?: StyleProp<ViewStyle>;
  scrollViewProps?: ScrollViewProps;
} & TInput;

const TextInputWithSuggestion = React.forwardRef(
  <T extends { label: string }>(
    {
      items,
      renderItem = item => <DropDownItem label={item.label} />,
      filter = (item, searchText) => item.label.toLowerCase().startsWith(searchText.toLowerCase()),
      suggestionBoxStyle,
      onItemSelect,
      onBlur,
      scrollViewProps,
      ...rest
    }: Props<T>,
    ref: React.ForwardedRef<InputHandles>,
  ) => {
    const isControlled = rest.value !== undefined;
    const validInputValue = isControlled ? rest.value : rest.defaultValue;
    const [visible, setVisible] = useState(false);
    const [filterList, setFilterList] = useState<T[]>([]);

    const [uncontrolledValue, setUncontrolledValue] = useState<string | undefined>(validInputValue || '');
    // Use value from props instead of local state when input is controlled
    const value = isControlled ? rest.value : uncontrolledValue;

    const handleChangeText = (currentValue: string) => {
      if (currentValue) {
        setFilterList(items.filter(i => filter(i, currentValue)));
        setVisible(true);
      } else {
        setFilterList([]);
      }

      if (!isControlled) {
        // Keep track of value in local state when input is not controlled
        setUncontrolledValue(currentValue);
      }
      rest.onChangeText?.(currentValue);
    };

    const handleItemSelection = (item: T) => {
      if (!isControlled) {
        // Keep track of value in local state when input is not controlled
        setUncontrolledValue(item.label);
      }
      rest.onChangeText?.(item.label);
      onItemSelect?.(item);
      setVisible(false);
    };

    const handleOnBlur = useCallback(
      e => {
        setVisible(false);
        onBlur?.(e);
      },
      [onBlur],
    );

    return (
      <View>
        <TextInput ref={ref} {...rest} value={value} onChangeText={handleChangeText} onBlur={handleOnBlur} />
        {visible && filterList.length !== 0 && (
          <View>
            <Surface
              borderBottomStartRadius={4}
              borderBottomEndRadius={4}
              width="100%"
              top={-12}
              position="absolute"
              elevation={8}
              zIndex={1000}
              maxHeight={200}
              style={suggestionBoxStyle}>
              <ScrollView
                nestedScrollEnabled
                persistentScrollbar
                keyboardShouldPersistTaps="handled"
                {...scrollViewProps}>
                {filterList.map((item, index) => (
                  <Touchable onPress={() => handleItemSelection(item)} key={`render=${index}`}>
                    {renderItem(item, index)}
                  </Touchable>
                ))}
              </ScrollView>
            </Surface>
          </View>
        )}
      </View>
    );
  },
);

export default TextInputWithSuggestion;
