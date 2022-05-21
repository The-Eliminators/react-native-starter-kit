import React from 'react';

import { Text, HeaderScreen, Box } from 'src/components';
import Input from 'src/components/Input/Input';

const TestScreen = () => {
  return (
    <HeaderScreen title="Test Screen" padding="l">
      <Input label="Name*" placeholder="Full Name" assistiveText="Required" />
      <Box paddingVertical="l" />
      <Input label="Email" disabled value="rohit.kadam@gmail.com" />
      <Box paddingVertical="l" />
      <Input label="Wrong" assistiveText="Assistive text" error errorMessage="Something went wrong" />
    </HeaderScreen>
  );
};

export default TestScreen;
