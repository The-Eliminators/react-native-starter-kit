import React, { Component, ReactNode } from 'react';

import { Text, Touchable, Box } from '..';
import { BottomSheetModal } from './BottomSheet';

type Action = {
  onPress: () => void;
  label: string | object;
  icon?: string;
};

const ActionCell = ({ label, icon, onPress }: Action) => {
  return (
    <Touchable flexDirection="row" height={48} alignItems="center" onPress={onPress}>
      {/* {Icon && (
          <Icon
            style={styles.actionIcon}
            name={icon}
            type={iconType}
            size={24}
            color={theme.onSurfaceMediumEmphasis}
          />
        )} */}
      <Text variant="subtitle" paddingStart="xxxl">
        {label as string}
      </Text>
    </Touchable>
  );
};

type ActionSheetProps = {
  actions: Action[];
  children?: ReactNode;
  ActionComponent: (props: Action) => JSX.Element;
};

class ActionSheet extends Component<ActionSheetProps, { visible: boolean }> {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  constructor(props: ActionSheetProps) {
    super(props);
    this.state = { visible: false };
    this.bottomSheetModalRef = React.createRef();
  }

  static defaultProps = {
    ActionComponent: ActionCell,
  };

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
    const { ActionComponent, actions, children } = this.props;
    return (
      <>
        {this.state.visible && (
          <BottomSheetModal ref={this.bottomSheetModalRef} onClose={this.hide}>
            {children}
            <Box padding="s">
              {actions.map((item, index) => (
                <ActionComponent
                  {...item}
                  onPress={() => {
                    this.close();
                    item.onPress();
                  }}
                  key={'key-' + index}
                />
              ))}
            </Box>
          </BottomSheetModal>
        )}
      </>
    );
  }
}

export default ActionSheet;

/**
 * ActionSheet Example

import React from 'react';

import { ActionSheet, Box, Button } from 'src/components';
import { useActionSheet } from 'src/hooks';

const TestScreen = () => {
  const { actionSheetRef, open } = useActionSheet();
  return (
    <>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Button label="Open Action sheet" onPress={() => open()} />
      </Box>
      <ActionSheet
        ref={actionSheetRef}
        actions={[
          { label: 'Delete', onPress: () => console.log('delete') },
          { label: 'Update', onPress: () => console.log('Update') },
          { label: 'Call to action', onPress: () => console.log('call to action') },
        ]}
      />
    </>
  );
};

export default TestScreen;


 */
