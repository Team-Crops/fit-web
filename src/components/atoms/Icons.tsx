import AccountIcon from 'src/assets/icons/account.svg';
import ArrowForward from 'src/assets/icons/arrow-forward.svg';
import ArrowRightIcon from 'src/assets/icons/arrow-right.svg';
import AwayIcon from 'src/assets/icons/away.svg';
import BellIcon from 'src/assets/icons/bell.svg';
import CheckIcon from 'src/assets/icons/check.svg';
import ClickIcon from 'src/assets/icons/click.svg';
import ClipIcon from 'src/assets/icons/clip.svg';
import CrossIcon from 'src/assets/icons/cross.svg';
import GoogleIcon from 'src/assets/icons/google.svg';
import InstagramIcon from 'src/assets/icons/instagram.svg';
import KakaoIcon from 'src/assets/icons/kakao.svg';
import LinkIcon from 'src/assets/icons/link.svg';
import LogoIcon from 'src/assets/icons/logo.svg';
import MegaphoneIcon from 'src/assets/icons/megaphone.svg';
import PenCilIcon from 'src/assets/icons/pencil.svg';
import PlusIcon from 'src/assets/icons/plus.svg';
import RunIcon from 'src/assets/icons/run.svg';
import Upload from 'src/assets/icons/upload.svg';
import UserIcon from 'src/assets/icons/user.svg';

export type IconName =
  | 'account'
  | 'arrowForward'
  | 'arrowRight'
  | 'away'
  | 'bell'
  | 'check'
  | 'click'
  | 'clip'
  | 'cross'
  | 'google'
  | 'instagram'
  | 'kakao'
  | 'link'
  | 'logo'
  | 'megaphone'
  | 'pencil'
  | 'plus'
  | 'run'
  | 'user'
  | 'upload';

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
  bell: {
    SVGR: BellIcon,
  },
  check: {
    SVGR: CheckIcon,
    color: '#9E9E9E',
  },
  click: {
    SVGR: ClickIcon,
    color: '#212121',
  },
  clip: {
    SVGR: ClipIcon,
  },
  cross: {
    SVGR: CrossIcon,
    color: '#212121',
  },
  google: {
    SVGR: GoogleIcon,
  },
  instagram: {
    SVGR: InstagramIcon,
  },
  kakao: {
    SVGR: KakaoIcon,
  },
  link: {
    SVGR: LinkIcon,
  },
  logo: {
    SVGR: LogoIcon,
    color: '#FF706C',
  },
  megaphone: {
    SVGR: MegaphoneIcon,
  },
  pencil: {
    SVGR: PenCilIcon,
  },
  plus: {
    SVGR: PlusIcon,
  },
  run: {
    SVGR: RunIcon,
    color: '#212121',
  },
  user: {
    SVGR: UserIcon,
  },
  upload: {
    SVGR: Upload,
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
