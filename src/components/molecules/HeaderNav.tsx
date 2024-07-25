import { usePathname } from 'next/navigation';

import styled from '@emotion/styled';

import { Txt } from '#atoms/Text';
import { GuardedLink } from '../atoms/Link';

const NavBlock = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-evenly;

  height: 100%;
`;
const NavLink = styled.div<{ isCurrent: boolean }>`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;

  &::after {
    content: '';

    position: absolute;
    bottom: 0;

    display: block;

    width: ${({ isCurrent }) => (isCurrent ? '150px' : '0px')};
    height: 3px;

    background: #ff706c;
    border-radius: 3px;
  }

  span {
    display: flex;
    align-items: center;
    height: 80px;
  }

  &:hover {
    &::after {
      width: 150px;
      transition: width 0.3s;
    }
  }
`;

const LinkList = [
  { name: '랜덤 팀 매칭', href: '/matching-info' },
  { name: '팀원 추천', href: '/team-recommend' },
  { name: '프로젝트', href: '/projects' },
  { name: '마이페이지', href: '/mypage' },
];

export const HeaderNav = () => {
  const pathName = usePathname();
  return (
    <NavBlock>
      {LinkList.map((link) => {
        return (
          <NavLink key={link.name} isCurrent={pathName === link.href}>
            <GuardedLink href={link.href}>
              <Txt size={'typo5'} weight={'bold'} color="#212121">
                {link.name}
              </Txt>
            </GuardedLink>
          </NavLink>
        );
      })}
    </NavBlock>
  );
};
