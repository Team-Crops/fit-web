import React from 'react';
import GoogleIcon from 'src/assets/icons/google.svg';
import KakaoIcon from 'src/assets/icons/kakao.svg';
import AccountIcon from 'src/assets/icons/account.svg';
import ArrowForward from 'src/assets/icons/arrow-forward.svg';
import ArrowRightIcon from 'src/assets/icons/arrow-right.svg';
import AwayIcon from 'src/assets/icons/away.svg';
import BellIcon from 'src/assets/icons/bell.svg';
import CheckIcon from 'src/assets/icons/check.svg';
import ClickIcon from 'src/assets/icons/click.svg';
import InstagramIcon from 'src/assets/icons/instagram.svg';
import CrossIcon from 'src/assets/icons/cross.svg';
import LogoIcon from 'src/assets/icons/logo.svg';
import MegaphoneIcon from 'src/assets/icons/megaphone.svg';
import RunIcon from 'src/assets/icons/run.svg';
import UserIcon from 'src/assets/icons/user.svg';

type IconName =
  | 'account'
  | 'arrowForward'
  | 'arrowRight'
  | 'away'
  | 'check'
  | 'click'
  | 'cross'
  | 'google'
  | 'kakao'
  | 'logo'
  | 'megaphone'
  | 'run';

interface Icon {
  SVGR: any;
  color?: string;
}

const icons: Record<IconName, Icon> = {
  account: {
    SVGR: AccountIcon,
    color: '#212121',
  },
  arrowForward: {
    SVGR: ArrowForward,
    color: '#919191',
  },
  arrowRight: {
    SVGR: ArrowRightIcon,
    color: '#212121',
  },
  away: {
    SVGR: AwayIcon,
    color: '#212121',
  },
  check: {
    SVGR: CheckIcon,
    color: '#9E9E9E',
  },
  click: {
    SVGR: ClickIcon,
    color: '#212121',
  },
  cross: {
    SVGR: CrossIcon,
    color: '#212121',
  },
  google: {
    SVGR: GoogleIcon,
  },
  kakao: {
    SVGR: KakaoIcon,
  },
  logo: {
    SVGR: LogoIcon,
    color: '#FF706C',
  },
  megaphone: {
    SVGR: MegaphoneIcon,
  },
  run: {
    SVGR: RunIcon,
    color: '#212121',
  },
};

interface IconsProps {
  icon: IconName;
  color?: string;
  width?: number;
  height?: number;
}

export const Icons = ({ icon, color, width, height }: IconsProps) => {
  const { SVGR, color: defaultColor } = icons[icon];
  return <SVGR width={width} height={height} color={color || defaultColor} />;
};
