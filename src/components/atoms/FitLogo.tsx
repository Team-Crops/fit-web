import styled from '@emotion/styled';
import Logo from 'src/assets/logo.svg';

const StyledLogo = styled(Logo)`
  path {
    ${({ color }) => color === 'gray' && `fill: #757575;`}
  }
`;

interface LogoProps {
  width: number;
  height: number;
  color?: 'primary' | 'gray';
}
export const FitLogo = ({ width, height, color }: LogoProps) => {
  return <StyledLogo width={width} height={height} color={color} />;
};
