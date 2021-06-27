import { useRef } from 'react';
import { ActionSheet } from 'src/components';

const useActionSheet = () => {
  const actionSheetRef = useRef<ActionSheet>(null);
  const open = () => actionSheetRef.current?.open();
  const close = () => actionSheetRef.current?.close();

  return {
    actionSheetRef,
    open,
    close,
  };
};

export default useActionSheet;
