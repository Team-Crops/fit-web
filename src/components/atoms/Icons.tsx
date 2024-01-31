import AccountIcon from 'src/assets/icons/account.svg';
import ArrowForward from 'src/assets/icons/arrow-forward.svg';
import ArrowRightIcon from 'src/assets/icons/arrow-right.svg';
import AwayIcon from 'src/assets/icons/away.svg';
import BellIcon from 'src/assets/icons/bell.svg';
import CheckIcon from 'src/assets/icons/check.svg';
import ClickIcon from 'src/assets/icons/click.svg';
import InstagramIcon from 'src/assets/icons/instagram.svg';
import MegaphoneIcon from 'src/assets/icons/megaphone.svg';
import RunIcon from 'src/assets/icons/run.svg';
import UserIcon from 'src/assets/icons/user.svg';

interface IconsProps {
  icon:
    | 'account'
    | 'arrow-forward'
    | 'arrow-right'
    | 'away'
    | 'bell'
    | 'check'
    | 'click'
    | 'megaphone'
    | 'run'
    | 'user'
    | 'instagram';
  color?: string;
  width?: number;
  height?: number;
}

export const Icons = ({ icon, color, width, height }: IconsProps) => {
  switch (icon) {
    case 'account':
      return <AccountIcon width={width} height={height} fill={color ?? '#212121'} />;
    case 'arrow-forward':
      return <ArrowForward width={width} height={height} fill={color ?? '#919191'} />;
    case 'arrow-right':
      return <ArrowRightIcon width={width} height={height} stroke={color ?? '#212121'} />;
    case 'away':
      return <AwayIcon width={width} height={height} fill={color ?? '#212121'} />;
    case 'check':
      return <CheckIcon width={width} height={height} stroke={color ?? '#9E9E9E'} />;
    case 'click':
      return <ClickIcon width={width} height={height} fill={color ?? '#212121'} />;
    case 'megaphone':
      return <MegaphoneIcon width={width} height={height} fill={color ?? '#212121'} />;
    case 'run':
      return <RunIcon width={width} height={height} fill={color ?? '#212121'} />;
    case 'user':
      return <UserIcon width={width} height={height} fill={color ?? '#212121'} />;
    case 'bell':
      return <BellIcon width={width} height={height} fill={color ?? '#212121'} />;
    case 'instagram':
      return <InstagramIcon width={width} height={height} fill={color ?? '#212121'} />;
    default:
      throw new Error(`Icon ${icon} is not supported!`);
  }
};
