import React from 'react';
import { SnackbarContext } from 'src/context';

const useSnackBar = () => React.useContext(SnackbarContext);
export default useSnackBar;
