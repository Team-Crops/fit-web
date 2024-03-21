import type { HTMLAttributes } from 'react';
import React from 'react';

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
  | 'cross'
  | 'emojiFire'
  | 'emojiHoldingBackTears'
  | 'google'
  | 'image'
  | 'info'
  | 'instagram'
  | 'kakao'
  | 'link'
  | 'logo'
  | 'megaphone'
  | 'pencil'
  | 'plus'
  | 'progress'
  | 'run'
  | 'user'
  | 'upload';

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
  cross: {
    SVGR: CrossIcon,
    color: '#212121',
  },
  emojiFire: {
    SVGR: EmojiFire,
  },
  emojiHoldingBackTears: {
    SVGR: EmojiHoldingBackTears,
  },
  google: {
    SVGR: GoogleIcon,
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
  plus: {
    SVGR: PlusIcon,
  },
  progress: {
    SVGR: ProgressIcon,
    color: '#FF706C',
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

interface IconsProps extends HTMLAttributes<SVGElement> {
  icon: IconName;
  width?: number;
  height?: number;
}

export const Icons = ({ icon, width, height, ...props }: IconsProps) => {
  const { SVGR, color: defaultColor, style } = icons[icon];
  return (
    <SVGR
      color={defaultColor}
      width={width}
      height={height}
      style={{ ...style, flexShrink: 0 }}
      {...props}
    />
  );
};
