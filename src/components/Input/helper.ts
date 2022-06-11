import { TextInputState } from './types';

export function getTextInputState(
  disabled: boolean,
  error: boolean,
  isFocused: boolean,
  hasValue: boolean,
): TextInputState {
  return disabled ? 'disabled' : error ? 'error' : isFocused ? 'focused' : hasValue ? 'hasValue' : 'normal';
}
