import { StackScreenProps } from '@react-navigation/stack';

/** Object mappings for route name to the params of the route
 *
 * Note: We can remove the word screen from the route name
 */
export type RootStackParamList = {
  HomeScreen: undefined;
  ComponentScreen: undefined;
  SettingScreen: undefined;
  TestScreen: undefined;
  InputFormScreen: undefined;
};

// Helper types
export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>;

// Specifying a global type for your root navigator would avoid manual annotations useNavigation, Link, ref
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
