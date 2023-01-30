import 'styled-components';
import { defaultTheme } from '../styles/themes/default';

//faça isso para ter o auto complete do seu tema globalmente no styled components


type ThemeType = typeof defaultTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType { }
}