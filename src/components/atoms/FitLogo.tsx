import Logo from 'src/assets/logo.svg';

interface LogoProps {
  width: number;
  height: number;
  color?: 'primary' | 'gray';
}
export const FitLogo: React.FC<LogoProps> = ({ width, height, color = 'primary' }) => {
  const colorMap = {
    primary: '#FF706C',
    gray: '#757575',
  };

  return <Logo width={width} height={height} color={colorMap[color]} />;
};
