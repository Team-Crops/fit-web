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
  | 'email'
  | 'emojiFire'
  | 'emojiHoldingBackTears'
  | 'emojiPartyingFace'
  | 'emojiWinkingFace'
  | 'google'
  | 'heart'
  | 'heartFill'
  | 'image'
  | 'info'
  | 'instagram'
  | 'kakao'
  | 'link'
  | 'logo'
  | 'megaphone'
  | 'pencil'
  | 'phoneFill'
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
    color: '#9e9e9e',
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
    color: '#FF908D',
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
  google: {
    SVGR: GoogleIcon,
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
    color: '#FF908D',
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
    color: '#FF908D',
  },
  phoneFill: {
    SVGR: PhoneFillIcon,
    color: '#424242',
  },
  plus: {
    SVGR: PlusIcon,
    color: '#FF908D',
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

interface IconsProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: IconName;

  size?: number;
  width?: number;
  height?: number;
}

export const Icons: React.FC<IconsProps> = ({ icon, width, height, size, color, ...props }) => {
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
    <div {...props}>
      <SVGR
        color={color ?? defaultColor}
        width={size ?? width}
        height={size ?? height}
        style={{ ...style, flexShrink: 0 }}
      />
    </div>
  );
};
