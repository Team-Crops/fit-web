type Breakpoint = 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';

const sizes: Record<Breakpoint, number> = {
  small: 640,
  medium: 768,
  large: 1024,
  xlarge: 1280,
  xxlarge: 1536,
};

export const media = Object.entries(sizes).reduce(
  (prev, [breakpoint, size]) => ({
    ...prev,
    [breakpoint]: `@media (max-width: ${size}px)`,
  }),
  {}
) as Record<Breakpoint, string>;
