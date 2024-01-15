import '@emotion/react';
import { Palette } from './color-system';

declare module '@emotion/react' {
  export interface Theme {
    palette: Palette;
  }
}
