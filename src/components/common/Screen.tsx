import React from 'react';
import type { ComponentPropsWithoutRef } from 'react';

import { Box, Header } from 'src/components';
import HeaderContent from '../Header/HeaderContent';
import type { ThemeColors } from 'src/types/theme.type';

type Props = {
  title: string;
  subtitle?: string;
  headerColor?: keyof ThemeColors;
  onSurfaceHighEmphasis?: keyof ThemeColors;
  onSurfaceMediumEmphasis?: keyof ThemeColors;
  children: React.ReactNode;
  statusContentColor?: 'dark-content' | 'light-content';
  menuActions?: { icon: string; onPress: () => void }[];
  renderLeftHeader?: (color: keyof ThemeColors) => JSX.Element | null;
  renderHeaderTitle?: (props: ComponentPropsWithoutRef<typeof HeaderContent>) => JSX.Element;
};

const Screen = ({
  title,
  subtitle,
  onSurfaceHighEmphasis = 'onSurfaceHighEmphasis',
  onSurfaceMediumEmphasis = 'onSurfaceMediumEmphasis',
  statusContentColor,
  headerColor,
  children,
  menuActions,
  renderLeftHeader = (color: keyof ThemeColors) => <Header.BackAction color={color} />,
  renderHeaderTitle = (props: ComponentPropsWithoutRef<typeof HeaderContent>) => <Header.Content {...props} />,
}: Props) => {
  return (
    <>
      <Header color={headerColor} statusContentColor={statusContentColor}>
        {renderLeftHeader(onSurfaceMediumEmphasis)}
        {renderHeaderTitle({
          title,
          subtitle,
          titleColor: onSurfaceHighEmphasis,
          subtitleColor: onSurfaceMediumEmphasis,
        })}
        {menuActions?.map((actions, index) => (
          <Header.Action {...actions} key={`header-action${index}`} />
        ))}
      </Header>
      <Box flex={1}>{children}</Box>
    </>
  );
};

export default Screen;
