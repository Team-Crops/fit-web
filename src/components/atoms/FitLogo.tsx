import Logo from 'src/assets/logo.svg';

interface LogoProps {
  width: number;
  height: number;
}

export const FitLogo = ({ width, height }: LogoProps) => {
  return <Logo width={width} height={height} />;
};
