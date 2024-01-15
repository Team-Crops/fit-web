import type { PaletteRange } from './types/color-system';
import type { Theme } from '@emotion/react';

interface PaletteBasic {
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

export function extendLightPalette(palette: PaletteBasic): PaletteRange {
  return {
    plainColor: palette[700],
    plainHoverBg: palette[50],
    plainActiveBg: palette[200],
    plainDisabledColor: palette[400],

    outlinedColor: palette[700],
    outlinedBorder: palette[300],
    outlinedHoverBg: palette[100],
    outlinedHoverBorder: palette[400],
    outlinedActiveBg: palette[200],
    outlinedDisabledColor: palette[400],
    outlinedDisabledBorder: palette[200],

    softColor: palette[700],
    softBg: palette[100],
    softHoverBg: palette[200],
    softActiveBg: palette[300],
    softDisabledColor: palette[400],
    softDisabledBg: palette[50],

    solidColor: palette[50],
    solidBg: palette[500],
    solidHoverBg: palette[600],
    solidActiveBg: palette[700],
    solidDisabledColor: palette[400],
    solidDisabledBg: palette[100],

    ...palette,
  };
}

function generateLightTheme({
  primary,
  neutral,
  danger,
}: {
  primary: PaletteBasic;
  neutral: PaletteBasic;
  danger: PaletteBasic;
}): Theme {
  return {
    palette: {
      mode: 'light',
      primary: extendLightPalette(primary),
      neutral: {
        ...extendLightPalette(neutral),
        plainHoverColor: neutral[900],
        outlinedHoverColor: neutral[700],
        softHoverColor: neutral[700],
      },
      danger: extendLightPalette(danger),
      success: extendLightPalette(primary),
      warning: extendLightPalette(primary),
      common: {
        white: '#fff',
        black: '#000',
      },
      text: {
        primary: neutral[800],
        secondary: neutral[700],
        tertiary: neutral[600],
        icon: neutral[500],
      },
      background: {
        body: '#fff',
        surface: neutral[50],
        popup: '#fff',
        level1: neutral[100],
        level2: neutral[200],
        level3: neutral[300],
        tooltip: neutral[500],
        backdrop: 'rgba(0, 0, 0, 0.25)',
      },
      divider: neutral[400],
      focusVisible: neutral[500],
    },
  };
}

export const lightTheme = generateLightTheme({
  primary: {
    50: '#FFEAE9',
    100: '#FFC7C6',
    200: '#FFA7A5',
    300: '#FF908D',
    400: '#FF706C',
    500: '#FF4F4B', // generated
    600: '#FF3B37', // generated
    700: '#FF2B27', // generated
    800: '#FF1D19', // generated
    900: '#FF0800', // generated
    mainChannel: '255 112 108',
    lightChannel: '255 167 165',
    darkChannel: '255 222 222',
  },
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
    mainChannel: '158 158 158',
    lightChannel: '238 238 238',
    darkChannel: '66 66 66',
  },
  danger: {
    50: '#FFE6E6', // generated
    100: '#FFCECC', // generated
    200: '#FF9C99', // generated
    300: '#FF6B66', // generated
    400: '#FF3933', // generated
    500: '#FF0800',
    600: '#DD0000', // generated
    700: '#BB0000', // generated
    800: '#790000', // generated
    900: '#3A0000', // generated
    mainChannel: '255 8 0',
    lightChannel: '255 156 153',
    darkChannel: '121 0 0',
  },
});
