import React, { Component, ReactNode } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Dimensions } from 'react-native';
import Surface from './Surface';
import Animated, {
  cond,
  eq,
  set,
  not,
  add,
  clockRunning,
  call,
  block,
  Clock,
  greaterThan,
  timing as reTiming,
  startClock,
  Value,
  stopClock,
  event,
  multiply,
  abs,
  sub,
  min,
} from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { Box } from '..';

export interface TimingParams {
  clock?: Animated.Clock;
  from?: Animated.Adaptable<number>;
  to?: Animated.Adaptable<number>;
  duration?: Animated.Adaptable<number>;
  easing?: (v: Animated.Adaptable<number>) => Animated.Node<number>;
}

export const timing = (params: TimingParams) => {
  const { clock, easing, duration, from, to } = {
    clock: new Clock(),
    duration: 250,
    from: 0,
    to: 1,
    easing: (v: Animated.Adaptable<number>) => add(v, 0),
    ...params,
  };

  const state: Animated.TimingState = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    toValue: new Value(0),
    duration,
    easing,
  };

  return block([
    cond(not(clockRunning(clock)), [set(config.toValue, to), set(state.frameTime, 0)]),
    block([
      cond(not(clockRunning(clock)), [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, from),
        startClock(clock),
      ]),
      reTiming(clock, state, config),
      cond(state.finished, stopClock(clock)),
      state.position,
    ]),
  ]);
};

export const snapPoint = (
  value: Animated.Adaptable<number>,
  velocity: Animated.Adaptable<number>,
  points: Animated.Adaptable<number>[],
) => {
  const point = add(value, multiply(0.2, velocity));
  const diffPoint = (p: Animated.Adaptable<number>) => abs(sub(point, p));
  const deltas = points.map(p => diffPoint(p));
  const minDelta = min(deltas[0], deltas[1]);
  return points.reduce((acc, p) => cond(eq(diffPoint(p), minDelta), p, acc), new Value()) as Animated.Node<number>;
};

interface BottomSheetModalProps {
  children: ReactNode;
  onClose: () => void;
}

interface BottomSheetProps {
  children: ReactNode;
}

export class BottomSheetModal extends Component<BottomSheetModalProps> {
  HEIGHT = 200;
  modalState = new Value<0 | 1 | 2>(0); // 0: start 1: intermediate 2: end
  velocityY = new Value(0);
  translateY = new Value(this.HEIGHT);
  translationY = new Value(this.HEIGHT);
  panState = new Value(State.UNDETERMINED);
  clock = new Clock();

  handlePan = event([
    {
      nativeEvent: {
        translationY: this.translationY,
        velocityY: this.velocityY,
        state: this.panState,
      },
    },
  ]);

  constructor(props: BottomSheetModalProps) {
    super(props);
    this.state = { visible: false };
  }

  private close = () => {
    this.props.onClose();
  };

  render() {
    const to = snapPoint(this.translateY, this.velocityY, [0, this.HEIGHT]);
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.modalState.setValue(2);
          }}>
          <Box flex={1} />
        </TouchableWithoutFeedback>
        <PanGestureHandler onGestureEvent={this.handlePan} onHandlerStateChange={this.handlePan}>
          <Animated.View
            style={{
              transform: [{ translateY: this.translateY }],
            }}>
            <Surface
              elevation={4}
              width="100%"
              bottom={0}
              borderTopLeftRadius={12}
              borderTopRightRadius={12}
              overflow="hidden"
              onLayout={({ nativeEvent }) => {
                const { height } = nativeEvent.layout;
                this.HEIGHT = height;
              }}>
              {this.props.children}
            </Surface>
            <Animated.Code
              exec={block([
                cond(eq(this.modalState, 0), [
                  set(this.translateY, timing({ clock: this.clock, from: this.translateY, to: 0, duration: 200 })),
                  cond(not(clockRunning(this.clock)), [set(this.modalState, 1)]),
                ]),
                cond(eq(this.modalState, 2), [
                  set(
                    this.translateY,
                    timing({ clock: this.clock, from: this.translateY, to: this.HEIGHT + 10, duration: 100 }),
                  ),
                  cond(not(clockRunning(this.clock)), [call([], () => this.close())]),
                ]),
                cond(eq(this.modalState, 1), [
                  cond(eq(this.panState, State.ACTIVE), [
                    cond(
                      greaterThan(add(this.translateY, this.translationY), 0),
                      set(this.translateY, this.translationY),
                    ),
                  ]),
                  cond(eq(this.panState, State.END), [
                    set(this.translateY, timing({ clock: this.clock, from: this.translateY, to, duration: 100 })),
                    cond(
                      not(clockRunning(this.clock)),
                      cond(
                        eq(to, this.HEIGHT),
                        call([], () => this.close()),
                      ),
                    ),
                  ]),
                ]),
              ])}
              dependencies={[this.modalState]}
            />
          </Animated.View>
        </PanGestureHandler>
      </View>
    );
  }
}

class BottomSheet extends Component<BottomSheetProps, { visible: boolean }> {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  constructor(props: BottomSheetProps) {
    super(props);
    this.state = { visible: false };
    this.bottomSheetModalRef = React.createRef();
  }

  public hide = () => {
    this.setState({ visible: false });
  };

  public close = () => {
    this.bottomSheetModalRef.current?.modalState.setValue(2);
  };

  public open = () => {
    this.setState({ visible: true });
  };

  render() {
    return (
      <>
        {this.state.visible && (
          <BottomSheetModal ref={this.bottomSheetModalRef} onClose={this.hide}>
            {this.props.children}
          </BottomSheetModal>
        )}
      </>
    );
  }
}

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: Dimensions.get('screen').width,
    height: '100%',
    backgroundColor: 'rgba(1,1,1,0.6)',
  },
});

/***
 *
 * Example of using BottomSheet

import React from 'react';
import useBottomSheet from 'src/hooks/useBottomSheet';
import { Button, Box, Text, BottomSheet } from 'src/components';

const TestScreen = () => {
  const { bottomSheetRef, open, close } = useBottomSheet();
  return (
    <>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Button label="Open Botton Sheet" onPress={() => open()} />
      </Box>
      <BottomSheet ref={bottomSheetRef}>
        <Box padding="m">
          <Box justifyContent="center" alignItems="center" paddingVertical="s">
            <Text variant="heading">Bottom Sheet Header</Text>
          </Box>
          <Text paddingVertical="s">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </Text>
          <Button label="close" onPress={() => close()} />
        </Box>
      </BottomSheet>
    </>
  );
};
 *
 */
