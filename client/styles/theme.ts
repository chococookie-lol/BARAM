import { GLOBAL_COLOR } from '../utils/color';

export const lightTheme = {
  background: GLOBAL_COLOR.white,
  foreground: GLOBAL_COLOR.onyx,
  accent1: GLOBAL_COLOR.mediumPurple,
  accent2: GLOBAL_COLOR.lightSteelBlue,
  accent3: GLOBAL_COLOR.lightPurple,
  blue1: GLOBAL_COLOR.blue1,
  blue2: GLOBAL_COLOR.blue2,
  blue3: GLOBAL_COLOR.blue3,
  blue4: GLOBAL_COLOR.blue4,
  red1: GLOBAL_COLOR.red1,
  red2: GLOBAL_COLOR.red2,
  red3: GLOBAL_COLOR.red3,
  red4: GLOBAL_COLOR.red4,
  neutral: GLOBAL_COLOR.neutral,
};

interface ThemeGroup {
  light: Theme;
  dark: Theme;
}

export const THEME: ThemeGroup = {
  light: lightTheme,
  dark: lightTheme,
};

export type Theme = typeof lightTheme;
