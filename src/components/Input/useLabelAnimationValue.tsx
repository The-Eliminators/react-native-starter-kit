import { useCallback, useRef } from 'react';
import { Animated, Easing } from 'react-native';

const labelPosition = {
  active: {
    fontSize: 12,
    topHeight: 8,
    lineHeight: 16,
  },
  inActive: {
    fontSize: 16,
    topHeight: 16,
    lineHeight: 24,
  },
};

const getLabelAnimation = (animatedObj: Animated.Value, toValue: number) => {
  return Animated.timing(animatedObj, {
    toValue,
    duration: 100,
    easing: Easing.linear,
    useNativeDriver: false,
  });
};

const useLabelAnimationValue = ({ activated }: { activated: boolean }) => {
  const fontSize = useRef(new Animated.Value(labelPosition[activated ? 'active' : 'inActive'].fontSize));
  const topHeight = useRef(new Animated.Value(labelPosition[activated ? 'active' : 'inActive'].topHeight));
  const lineHeight = useRef(new Animated.Value(labelPosition[activated ? 'active' : 'inActive'].lineHeight));

  const activate = useCallback(() => {
    Animated.parallel([
      getLabelAnimation(fontSize.current, labelPosition.active.fontSize),
      getLabelAnimation(topHeight.current, labelPosition.active.topHeight),
      getLabelAnimation(lineHeight.current, labelPosition.active.lineHeight),
    ]).start();
  }, []);

  const deactivate = useCallback(() => {
    Animated.parallel([
      getLabelAnimation(fontSize.current, labelPosition.inActive.fontSize),
      getLabelAnimation(topHeight.current, labelPosition.inActive.topHeight),
      getLabelAnimation(lineHeight.current, labelPosition.inActive.lineHeight),
    ]).start();
  }, []);

  return {
    fontSize: fontSize.current,
    topHeight: topHeight.current,
    lineHeight: lineHeight.current,
    activate,
    deactivate,
  };
};

export default useLabelAnimationValue;
