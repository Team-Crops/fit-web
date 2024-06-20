import ColoredLogo from '#/assets/logos/colored.svg';
import MonochromeLogo from '#/assets/logos/monochrome.svg';

interface LogoProps {
  height?: number;
  color?: 'primary' | 'gray' | string;
}
export const FitLogo: React.FC<LogoProps> = ({ height = 40, color = 'primary' }) => {
  const aspectRatio = 120 / 40;
  return color === 'primary' ? (
    <ColoredLogo width={height * aspectRatio} height={height} />
  ) : (
    <MonochromeLogo
      width={height * aspectRatio}
      height={height}
      color={color === 'gray' ? '#757575' : color}
    />
  );
};
