import React from 'react';
import { Animated, SafeAreaView, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { Touchable, Text, Surface } from '..';

/**
 * Snackbars provide brief feedback about an operation through a message at the bottom of the screen.
 */

export type SnackbarProps = {
  visible: boolean;
  action?: {
    label: string;
    onPress: () => void;
  };
  type?: 'normal' | 'success' | 'info' | 'warning' | 'error';
  text: string;
};

const Snackbar = ({ visible, action, type = 'normal', text }: SnackbarProps) => {
  const { current: opacity } = React.useRef<Animated.Value>(new Animated.Value(0.0));
  const [hidden, setHidden] = React.useState<boolean>(!visible);

  const scale = 1.0;

  React.useLayoutEffect(() => {
    if (visible) {
      setHidden(false);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200 * scale,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 100 * scale,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setHidden(true);
        }
      });
    }
  }, [visible, opacity, scale]);
  if (hidden) {
    return null;
  }

  const backgroundColor = type === 'normal' ? 'onSurface' : type;
  const textColor = type === 'normal' ? 'surface' : 'onColor';
  const actionLabelColor = type === 'normal' ? 'primary' : 'onColor';

  return (
    <SafeAreaView pointerEvents="box-none" style={styles.wrapper}>
      <Surface
        pointerEvents="box-none"
        accessibilityLiveRegion="polite"
        backgroundColor={backgroundColor}
        style={
          [
            styles.container,
            {
              borderRadius: 8,
              opacity: opacity,
              transform: [
                {
                  scale: visible
                    ? opacity.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.9, 1],
                      })
                    : 1,
                },
              ],
            },
          ] as StyleProp<ViewStyle>
        }>
        <Text marginRight={action ? 'none' : 'l'} style={styles.content} color={textColor}>
          {text}
        </Text>
        {action ? (
          <Touchable
            onPress={() => {
              action.onPress();
            }}
            style={[styles.button]}>
            <Text variant="body" color={actionLabelColor} opacity={0.87} textTransform="uppercase">
              {action.label}
            </Text>
          </Touchable>
        ) : null}
      </Surface>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  container: {
    elevation: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  content: {
    marginLeft: 16,
    marginVertical: 14,
    flexWrap: 'wrap',
    flex: 1,
  },
  button: {
    marginHorizontal: 12,
    marginVertical: 6,
  },
});

export default Snackbar;
