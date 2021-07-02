import HeaderAction from './HeaderAction';
import HeaderContent from './HeaderContent';
import HeaderComponent from './HeaderComponent';
import HeaderBackAction from './HeaderBackAction';

const Header = Object.assign(
  // @component ./Header.tsx
  HeaderComponent,
  {
    Content: HeaderContent,
    Action: HeaderAction,
    BackAction: HeaderBackAction,
  },
);

export default Header;
