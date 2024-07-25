import { MonochromeSignatureLogo, SignatureLogo, SymbolLogo } from '#/assets/logos';

interface LogoProps {
  variant?: 'signature' | 'symbol';
  height?: number;
  color?: 'primary' | 'gray' | string;
}
export const FitLogo: React.FC<LogoProps> = ({
  variant = 'signature',
  height = 40,
  color = 'primary',
}) => {
  const colors: Record<string, string> = {
    primary: '#FF706C',
    gray: '#757575',
  };
  const pickedColor = colors[color] ?? color;

  if (variant === 'signature') {
    const aspectRatio = 120 / 40;
    return color === 'primary' ? (
      <SignatureLogo width={height * aspectRatio} height={height} />
    ) : (
      <MonochromeSignatureLogo width={height * aspectRatio} height={height} color={pickedColor} />
    );
  } else if (variant === 'symbol') {
    return <SymbolLogo width={height} height={height} color={pickedColor} />;
  }
};
