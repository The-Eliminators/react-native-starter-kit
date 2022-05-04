import React from 'react';
import type { ComponentPropsWithoutRef } from 'react';

import { Box, Header } from 'src/components';
import HeaderContent from '../Header/HeaderContent';
import { THeaderAction } from '../Header/HeaderAction';
import type { ThemeColors } from 'src/types/theme.type';

type TScreen = {
  title: string;
  subtitle?: string;
  headerColor?: keyof ThemeColors;
  titleColor?: keyof ThemeColors;
  subtitleColor?: keyof ThemeColors;
  children: React.ReactNode;
  statusContentColor?: 'dark-content' | 'light-content';
  menuActions?: THeaderAction[];
  renderLeftHeader?: ((color: keyof ThemeColors) => JSX.Element) | null;
  renderHeaderTitle?: (props: ComponentPropsWithoutRef<typeof HeaderContent>) => JSX.Element;
} & ComponentPropsWithoutRef<typeof Box>; // All the property of Box will pass to children

const Screen = ({
  title,
  subtitle,
  titleColor = 'onSurfaceHighEmphasis',
  subtitleColor = 'onSurfaceMediumEmphasis',
  statusContentColor,
  headerColor,
  children,
  menuActions,
  renderLeftHeader = (color: keyof ThemeColors) => <Header.BackAction color={color} />,
  renderHeaderTitle = (props: ComponentPropsWithoutRef<typeof HeaderContent>) => <Header.Content {...props} />,
  ...childrenProps
}: TScreen) => {
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
      <Box flex={1} {...childrenProps}>
        {children}
      </Box>
    </>
  );
};

export default Screen;
