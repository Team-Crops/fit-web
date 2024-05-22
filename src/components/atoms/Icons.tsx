import type { HTMLAttributes } from 'react';
import React from 'react';
import Image from 'next/image';

import {
  AccountIcon,
  ArrowDown,
  ArrowForward,
  ArrowForwardOutlined,
  ArrowRightIcon,
  AwayIcon,
  BellIcon,
  CameraIcon,
  CheckIcon,
  ClickIcon,
  ClipIcon,
  CrossIcon,
  EmojiFire,
  EmojiHoldingBackTears,
  EmojiPartyingFace,
  EmojiWinkingFace,
  GoogleIcon,
  ImageIcon,
  InfoIcon,
  InstagramIcon,
  KakaoIcon,
  LinkIcon,
  LogoIcon,
  MegaphoneIcon,
  PencilIcon,
  PlusIcon,
  ProgressIcon,
  RunIcon,
  Upload,
  UserIcon,
  HeartIcon,
  HeartFillIcon,
  EmailIcon,
  PhoneFillIcon,
  GithubIcon,
  FacebookIcon,
  LinkedInIcon,
  TistoryIcon,
  VelogIcon,
  ClipBoldIcon,
} from '#/assets/icons';

export type IconName =
  | 'account'
  | 'arrowDown'
  | 'arrowForward'
  | 'arrowForwardOutlined'
  | 'arrowBackward'
  | 'arrowBackwardOutlined'
  | 'arrowRight'
  | 'away'
  | 'bell'
  | 'camera'
  | 'check'
  | 'click'
  | 'clip'
  | 'clipBold'
  | 'cross'
  | 'email'
  | 'emojiFire'
  | 'emojiHoldingBackTears'
  | 'emojiPartyingFace'
  | 'emojiWinkingFace'
  | 'facebook'
  | 'google'
  | 'github'
  | 'heart'
  | 'heartFill'
  | 'image'
  | 'info'
  | 'instagram'
  | 'kakao'
  | 'link'
  | 'linkedin'
  | 'logo'
  | 'megaphone'
  | 'pencil'
  | 'phoneFill'
  | 'plus'
  | 'progress'
  | 'tistory'
  | 'run'
  | 'user'
  | 'upload'
  | 'velog';

interface Icon {
  SVGR: any;
  color?: string;
  style?: React.CSSProperties;
}

const icons: Record<IconName, Icon> = {
  account: {
    SVGR: AccountIcon,
    color: '#212121',
  },
  arrowDown: {
    SVGR: ArrowDown,
    color: '#bdbdbd',
  },
  arrowForward: {
    SVGR: ArrowForward,
    color: 'rgba(0, 0, 0, 0.57)',
    style: {
      boxShadow: '0px 0px 40px 0px rgba(0, 0, 0, 0.15)',
      borderRadius: '50%',
    },
  },
  arrowForwardOutlined: {
    SVGR: ArrowForwardOutlined,
    color: '#FF706C',
    style: {
      boxShadow: '0px 0px 40px 0px rgba(0, 0, 0, 0.15)',
      borderRadius: '50%',
    },
  },
  arrowBackward: {
    SVGR: ArrowForward,
    color: 'rgba(0, 0, 0, 0.57)',
    style: {
      boxShadow: '0px 0px 40px 0px rgba(0, 0, 0, 0.15)',
      borderRadius: '50%',
      transform: 'rotate(180deg)',
    },
  },
  arrowBackwardOutlined: {
    SVGR: ArrowForwardOutlined,
    color: '#FF706C',
    style: {
      boxShadow: '0px 0px 40px 0px rgba(0, 0, 0, 0.15)',
      borderRadius: '50%',
      transform: 'rotate(180deg)',
    },
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
  camera: {
    SVGR: CameraIcon,
    color: '#bdbdbd',
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
  clipBold: {
    SVGR: ClipBoldIcon,
  },
  cross: {
    SVGR: CrossIcon,
    color: '#212121',
  },
  email: {
    SVGR: EmailIcon,
    color: '#424242',
  },
  emojiFire: {
    SVGR: EmojiFire,
  },
  emojiHoldingBackTears: {
    SVGR: EmojiHoldingBackTears,
  },
  emojiPartyingFace: {
    SVGR: EmojiPartyingFace,
  },
  emojiWinkingFace: {
    SVGR: EmojiWinkingFace,
  },
  facebook: {
    SVGR: FacebookIcon,
  },
  google: {
    SVGR: GoogleIcon,
  },
  github: {
    SVGR: GithubIcon,
  },
  heart: {
    SVGR: HeartIcon,
    color: '#E0E0E0',
  },
  heartFill: {
    SVGR: HeartFillIcon,
    color: '#FF706C',
  },
  image: {
    SVGR: ImageIcon,
    color: '#FF908D',
  },
  instagram: {
    SVGR: InstagramIcon,
  },
  info: {
    SVGR: InfoIcon,
    color: '#BDBDBD',
  },
  kakao: {
    SVGR: KakaoIcon,
  },
  link: {
    SVGR: LinkIcon,
  },
  linkedin: {
    SVGR: LinkedInIcon,
  },
  logo: {
    SVGR: LogoIcon,
    color: '#FF706C',
  },
  megaphone: {
    SVGR: MegaphoneIcon,
  },
  pencil: {
    SVGR: PencilIcon,
  },
  phoneFill: {
    SVGR: PhoneFillIcon,
    color: '#424242',
  },
  plus: {
    SVGR: PlusIcon,
  },
  progress: {
    SVGR: ProgressIcon,
    color: '#FF706C',
  },
  tistory: {
    SVGR: TistoryIcon,
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
  velog: {
    SVGR: VelogIcon,
  },
};

interface IconsProps extends HTMLAttributes<SVGElement> {
  icon: IconName;

  size?: number;
  width?: number;
  height?: number;

  isError?: boolean;
  isOpened?: boolean;
}

export const Icons: React.FC<IconsProps> = ({
  icon,
  width,
  height,
  size,
  isError,
  isOpened,
  ...props
}) => {
  const { SVGR, color: defaultColor, style } = icons[icon];
  if (typeof SVGR === 'object') {
    return (
      <Image
        className={props.className}
        src={SVGR}
        alt={icon}
        width={size ?? width}
        height={size ?? height}
      />
    );
  }

  return (
    <SVGR
      color={defaultColor}
      width={size ?? width}
      height={size ?? height}
      style={{ ...style, flexShrink: 0 }}
      {...props}
    />
  );
};
