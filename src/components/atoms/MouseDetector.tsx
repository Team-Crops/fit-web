import { useEffect, useRef } from 'react';

interface MouseDetectorProps extends React.HTMLAttributes<HTMLDivElement> {
  onClickOutside?: () => void;
}

export const MouseDetector = ({ onClickOutside, ...props }: MouseDetectorProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onClickOutside) {
      const handleClickOutside = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          onClickOutside();
        }
      };
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [onClickOutside]);

  return <div ref={ref} {...props} />;
};
