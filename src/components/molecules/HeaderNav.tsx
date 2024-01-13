import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Txt } from '#atoms/Text';
import styled from '@emotion/styled';

const NavBlock = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;
const NavLink = styled(Link)<{ isCurrent: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 18px 50px 0;
  &::after {
    content: '';
    position: absolute;
    bottom: 0px;
    display: block;
    width: ${({ isCurrent }) => (isCurrent ? '150px' : '0px')};
    height: 3px;
    background: #ff706c;
    border-radius: 3px;
  }

  &:hover {
    &::after {
      width: 150px;
      transition: width 0.3s;
    }
  }
`;

const LinkList = [
  { name: '랜덤 팀 매칭', href: '/matchingInfo' },
  { name: '팀원 추천', href: '/teamRecommend' },
  { name: '프로젝트', href: '/project' },
  { name: '마이페이지', href: '/myPage' },
];

export const HeaderNav = () => {
  const pathName = usePathname();
  return (
    <NavBlock>
      {LinkList.map((link) => {
        return (
          <NavLink href={link.href} key={link.name} isCurrent={pathName === link.href}>
            <Txt size={'typo5'} weight={'bold'}>
              {link.name}
            </Txt>
          </NavLink>
        );
      })}
    </NavBlock>
  );
};
