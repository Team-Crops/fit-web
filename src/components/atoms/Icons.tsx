import React from 'react';
import Image from 'next/image';

import styled from '@emotion/styled';

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
  CrownIcon,
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
  MegaphoneIcon,
  PencilIcon,
  PlusIcon,
  ProgressIcon,
  RunIcon,
  Upload,
  UserIcon,
  HeartIcon,
  HeartFilledIcon,
  EmailIcon,
  PhoneFillIcon,
  GithubIcon,
  FacebookIcon,
  LinkedInIcon,
  TistoryIcon,
  VelogIcon,
  ClipBoldIcon,
  UserLineIcon,
  LogoutIcon,
  EmojiPoliceCarLight,
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
  | 'crown'
  | 'email'
  | 'emojiFire'
  | 'emojiHoldingBackTears'
  | 'emojiPartyingFace'
  | 'emojiPoliceCarLight'
  | 'emojiWinkingFace'
  | 'facebook'
  | 'google'
  | 'github'
  | 'heart'
  | 'heartFilled'
  | 'image'
  | 'info'
  | 'instagram'
  | 'kakao'
  | 'link'
  | 'linkedin'
  | 'logout'
  | 'megaphone'
  | 'pencil'
  | 'phoneFill'
  | 'plus'
  | 'progress'
  | 'tistory'
  | 'run'
  | 'user'
  | 'userLine'
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
  clipBold: {
    SVGR: ClipBoldIcon,
  },
  cross: {
    SVGR: CrossIcon,
    color: '#212121',
  },
  crown: {
    SVGR: CrownIcon,
    color: '#4960D9',
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
  emojiPoliceCarLight: {
    SVGR: EmojiPoliceCarLight,
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
  heartFilled: {
    SVGR: HeartFilledIcon,
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
  linkedin: {
    SVGR: LinkedInIcon,
  },
  logout: {
    SVGR: LogoutIcon,
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
  userLine: {
    SVGR: UserLineIcon,
  },
  upload: {
    SVGR: Upload,
  },
  velog: {
    SVGR: VelogIcon,
  },
};

interface IconsProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: IconName;
  useCSSColor?: boolean;

  size?: number;
  width?: number;
  height?: number;
}

export const Icons: React.FC<IconsProps> = ({
  icon,
  useCSSColor,
  width,
  height,
  size,
  color,
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
    <Container {...props}>
      {useCSSColor ? (
        <SVGR width={size ?? width} height={size ?? height} style={{ ...style, flexShrink: 0 }} />
      ) : (
        <SVGR
          color={color ?? defaultColor}
          width={size ?? width}
          height={size ?? height}
          style={{ ...style, flexShrink: 0 }}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: contents;
`;
