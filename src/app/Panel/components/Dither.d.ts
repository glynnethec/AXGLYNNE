import type { CSSProperties, FC } from 'react';

export type DitherMode =
  | 'bayer'
  | 'bayer4'
  | 'bayer2'
  | 'halftone'
  | 'lines'
  | 'crosshatch'
  | 'noise'
  | 'none';

export type DitherMouseEffect = 'erase' | 'reveal' | 'ripple';

export interface DitherProps {
  waveSpeed?: number;
  waveFrequency?: number;
  waveAmplitude?: number;
  waveColor?: string | number[];
  backgroundColor?: string | number[];
  colorNum?: number;
  pixelSize?: number;
  disableAnimation?: boolean;
  enableMouseInteraction?: boolean;
  mouseRadius?: number;
  ditherMode?: DitherMode;
  palette?: (string | number[])[];
  scale?: number;
  contrast?: number;
  brightness?: number;
  mouseEffect?: DitherMouseEffect;
  mouseStrength?: number;
  trail?: number;
  clickRipple?: boolean;
  intro?: boolean;
  dpr?: number;
  className?: string;
  style?: CSSProperties;
}

declare const Dither: FC<DitherProps>;
export default Dither;

