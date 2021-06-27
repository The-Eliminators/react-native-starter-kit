import { useRef } from 'react';
import { BottomSheet } from 'src/components';

const useBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const open = () => bottomSheetRef.current?.open();
  const close = () => bottomSheetRef.current?.close();

  return {
    bottomSheetRef,
    open,
    close,
  };
};

export default useBottomSheet;
