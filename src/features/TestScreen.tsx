import React from 'react';

import { Box, Text, Screen } from 'src/components';

const TestScreen = () => {
  return (
    <Screen title="Test Screen" subtitle="Test component here">
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text> Test Component: Discard all changes after done</Text>
      </Box>
    </Screen>
  );
};

export default TestScreen;
