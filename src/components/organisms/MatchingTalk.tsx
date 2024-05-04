import { useEffect, useRef } from 'react';

import styled from '@emotion/styled';

import { Icons } from '#/components/atoms/Icons';
import { Input } from '#/components/atoms/Input';
import { Txt } from '#/components/atoms/Text';
import { TalkBubble } from '#/components/molecules/TalkBubble';
import { TalkPositionGroup } from '#/components/molecules/TalkPositionGroup';
import { exampleUsers } from '#/entities';

const TalkContainer = styled.div`
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 80px 1fr 120px;

  width: 100%;
  max-width: 1200px;

  border: 1px solid #e0e0e0;
  border-radius: 10px;
`;

const TalkGroupsContainer = styled.div`
  display: flex;
  grid-column: 1 / 2;
  grid-row: 1 / 4;
  flex-direction: column;
  gap: 30px;
  justify-content: space-between;

  height: fit-content;
  padding: 30px 60px;
`;

const TalkGroupTexts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TalkGroups = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const TalkBubbleHeader = styled(Txt)`
  padding: 28px 0 20px 28px;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  border-left: 1px solid #e0e0e0;
`;

const TalkBubbles = styled.div`
  position: relative;

  overflow-y: scroll;
  display: flex;
  flex-direction: column-reverse;
  gap: 60px;

  height: 100%;
  padding: 28px;

  background: #fafafa;
`;

const TalkToolbox = styled.div`
  position: relative;

  display: flex;
  gap: 10px;

  padding: 30px;

  background: #fafafa;
`;

const IconBox = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  width: 60px;
  height: 60px;

  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 50%;

  transition: all 0.3s;

  :hover {
    cursor: pointer;
    background-color: #fafafa;
  }
`;

const TextInput = styled(Input)`
  height: 60px;
  padding: 20px 30px;

  font-family: 'Spoqa Han Sans Neo', sans-serif;
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.8px;

  background: #fff;
  border-radius: 100px;
`;

const SendButton = styled(Icons)`
  position: absolute;
  right: 35px;
  bottom: 35px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 5px;

  color: #ff908d;

  background: transparent;
  border-radius: 50%;

  transition: all 0.3s;

  :hover {
    cursor: pointer;
    color: #ff706c;
    background-color: #fafafa;
  }
`;

export const MatchingTalk = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const groupsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function adjustHeight() {
      if (containerRef.current && groupsRef.current) {
        const groupsHeight = groupsRef.current.clientHeight;
        containerRef.current.style.height = `${groupsHeight}px`;
      }
    }
    adjustHeight();
    window.addEventListener('resize', adjustHeight);
    return () => window.removeEventListener('resize', adjustHeight);
  }, []);

  return (
    <TalkContainer ref={containerRef}>
      <TalkGroupsContainer ref={groupsRef}>
        <TalkGroupTexts>
          <Txt size="typo3" weight="bold">
            현재 팀원
          </Txt>
          <Txt size="typo5" weight="medium" color="#ff908d">
            모든 팀원이 참여 상태여야 프로젝트를 시작할 수 있어요!
          </Txt>
        </TalkGroupTexts>
        <TalkGroups>
          <TalkPositionGroup groupName="기획자" users={[exampleUsers[0], null, null]} />
          <TalkPositionGroup groupName="서버 개발자" users={[exampleUsers[5], exampleUsers[6]]} />
          <TalkPositionGroup
            groupName="디자이너"
            users={[exampleUsers[1], exampleUsers[2], null, null]}
          />
          <TalkPositionGroup
            groupName="웹 프론트엔드 개발자"
            users={[exampleUsers[3], exampleUsers[4]]}
          />
        </TalkGroups>
      </TalkGroupsContainer>
      <TalkBubbleHeader size="typo3" weight="bold" color="#757575">
        채팅방
      </TalkBubbleHeader>
      <TalkBubbles>
        <TalkBubble user={exampleUsers[0]}>
          아아 그렇군요! 저는 오늘 내로 답변을 드리겠습니다!!
        </TalkBubble>
        <TalkBubble user={exampleUsers[1]} myBubble>
          안녕하세요 예진님 세헌님! 이 프로젝트는 포트폴리오 목적으로, 기획자 1명 ,디자이너 2명,
          서버개발 2명, 웹 프론트엔드 개발자 2명이 구성되면 시작할 예정입니다. 팀원이 확정되면
          계획을 말씀드리겠습니다!
        </TalkBubble>
        <TalkBubble user={exampleUsers[2]}>
          안녕하세요 저는 웹 프론트엔드 개발 분야를 준비하고 있는 취준생 세헌이라고 합니다. 이
          프로젝트는 포트폴리오 목적인가요? 아니면 실제 구현까지 하는 것을 목표로 하나요?
        </TalkBubble>
        <TalkBubble user={exampleUsers[3]}>
          안녕하세요 :) 저는 디자인을 전공하고 있는 4학년 예진입니다. 대학생들을 위한 fit 서비스
          프로젝트는 어떻게 진행되나요?
        </TalkBubble>
      </TalkBubbles>
      <TalkToolbox>
        <IconBox>
          <Icons icon="image" width={36} height={36} />
        </IconBox>
        <TextInput placeholder="대기방의 팀원에게 메세지를 보내보세요" />
        <SendButton icon="upload" width={50} height={50} />
      </TalkToolbox>
    </TalkContainer>
  );
};
