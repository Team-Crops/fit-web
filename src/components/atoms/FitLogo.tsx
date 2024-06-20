import { SignatureLogo, MonochromeSignatureLogo } from '#/assets/logos';

interface LogoProps {
  height?: number;
  color?: 'primary' | 'gray' | string;
}
export const FitLogo: React.FC<LogoProps> = ({ height = 40, color = 'primary' }) => {
  const aspectRatio = 120 / 40;
  return color === 'primary' ? (
    <SignatureLogo width={height * aspectRatio} height={height} />
  ) : (
    <MonochromeSignatureLogo
      width={height * aspectRatio}
      height={height}
      color={color === 'gray' ? '#757575' : color}
    />
  );
};
