import { forwardRef } from 'react';

export const Loading = forwardRef<HTMLDivElement>(({}, ref) => {
  return <div ref={ref}>Loading...</div>;
});

Loading.displayName = 'Loading';
