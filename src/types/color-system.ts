import { Theme } from '@emotion/react';

interface PaletteVariant {
  plainColor: string;
  plainHoverBg: string;
  plainActiveBg: string;
  plainDisabledColor: string;

  outlinedColor: string;
  outlinedBorder: string;
  outlinedHoverBg: string;
  outlinedHoverBorder: string;
  outlinedActiveBg: string;
  outlinedDisabledColor: string;
  outlinedDisabledBorder: string;

  softColor: string;
  softBg: string;
  softHoverBg: string;
  softActiveBg: string;
  softDisabledColor: string;
  softDisabledBg: string;

  solidColor: string;
  solidBg: string;
  solidHoverBg: string;
  solidActiveBg: string;
  solidDisabledColor: string;
  solidDisabledBg: string;
}

export interface PaletteRange extends PaletteVariant {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  mainChannel: string;
  lightChannel: string;
  darkChannel: string;
}

interface PalettePrimary extends PaletteRange {}
interface PaletteNeutral extends PaletteRange {
  plainHoverColor: string;
  outlinedHoverColor: string;
  softHoverColor: string;
}
interface PaletteDanger extends PaletteRange {}
interface PaletteSuccess extends PaletteRange {}
interface PaletteWarning extends PaletteRange {}

interface PaletteCommon {
  white: string;
  black: string;
}

interface PaletteText {
  primary: string;
  secondary: string;
  tertiary: string;
  icon: string;
}

interface PaletteBackground {
  body: string;
  surface: string;
  popup: string;
  level1: string;
  level2: string;
  level3: string;
  tooltip: string;
  backdrop: string;
}

export interface Palette {
  mode: 'light' | 'dark';
  primary: PalettePrimary;
  neutral: PaletteNeutral;
  danger: PaletteDanger;
  success: PaletteSuccess;
  warning: PaletteWarning;
  common: PaletteCommon;
  text: PaletteText;
  background: PaletteBackground;
  divider: string;
  focusVisible: string;
}
