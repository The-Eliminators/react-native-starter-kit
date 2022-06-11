import React from 'react';
import { ScrollViewProps } from 'react-native';
import type { ComponentPropsWithoutRef } from 'react';

import ScrollView from './ScrollView';
import { Box, Header } from 'src/components';
import HeaderContent from '../Header/HeaderContent';
import { THeaderAction } from '../Header/HeaderAction';
import type { ThemeColors } from 'src/theme/theme.type';

type THeaderScreen = {
  title: string;
  subtitle?: string;
  headerColor?: keyof ThemeColors;
  titleColor?: keyof ThemeColors;
  subtitleColor?: keyof ThemeColors;
  children: React.ReactNode;
  scrollEnabled?: boolean;
  scrollViewProps?: ScrollViewProps;
  statusContentColor?: 'dark-content' | 'light-content';
  menuActions?: THeaderAction[];
  renderLeftHeader?: ((color: keyof ThemeColors) => JSX.Element) | null;
  renderHeaderTitle?: (props: ComponentPropsWithoutRef<typeof HeaderContent>) => JSX.Element;
} & ComponentPropsWithoutRef<typeof Box>; // All the property of Box will pass to children

const HeaderScreen = ({
  title,
  subtitle,
  titleColor = 'onSurfaceHighEmphasis',
  subtitleColor = 'onSurfaceMediumEmphasis',
  statusContentColor,
  headerColor,
  children,
  scrollEnabled = false,
  scrollViewProps,
  menuActions,
  renderLeftHeader = (color: keyof ThemeColors) => <Header.BackAction color={color} />,
  renderHeaderTitle = (props: ComponentPropsWithoutRef<typeof HeaderContent>) => <Header.Content {...props} />,
  ...childrenProps
}: THeaderScreen) => {
  const WrapperComponent = scrollEnabled ? ScrollView : Box;

  return (
    <>
      <Header color={headerColor} statusContentColor={statusContentColor}>
        {renderLeftHeader?.(titleColor)}
        {renderHeaderTitle({
          title,
          subtitle,
          titleColor: titleColor,
          subtitleColor: subtitleColor,
        })}
        {menuActions?.map((actions, index) => (
          <Header.Action color={titleColor} {...actions} key={`header-action${index}`} />
        ))}
      </Header>
      <WrapperComponent flex={1} {...childrenProps} {...scrollViewProps}>
        {children}
      </WrapperComponent>
    </>
  );
};

export default HeaderScreen;
