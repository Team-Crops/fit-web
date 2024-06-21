import { forwardRef, useMemo } from 'react';
import Link from 'next/link';

import styled from '@emotion/styled';

import { Alarm } from '#/types';
import { alarmReplaceText } from '#/utilities/alarm-replace-text';
import { Txt } from '.';

const Block = styled.div<{ isRead: boolean }>`
  height: 104px;
  padding: 18px 22px 21px;
  background-color: ${({ isRead }) => (isRead ? '#fff' : '#ffeae980')};
  border-bottom: 1px solid #eee;
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 7px;
`;

interface AlarmBlockProps {
  alarmData: Alarm;
  toggleModal: () => void;
}

const timeFormat = (time: string) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');

  return `${year}.${month}.${day} ${hour}:${minute}`;
};

export const AlarmBlock = forwardRef<HTMLDivElement, AlarmBlockProps>(
  ({ alarmData, toggleModal }, ref) => {
    const alarmText = useMemo(() => alarmReplaceText(alarmData.alarmCase), [alarmData]);

    return (
      <Link href={alarmText?.link ? alarmText?.link : ''} onClick={toggleModal}>
        <Block ref={ref} isRead={alarmData.isRead}>
          <Top>
            <Txt size="typo6" color="#9E9E9E">
              {alarmText.category}
            </Txt>
            <Txt size="typo6" color="#9E9E9E">
              {timeFormat(alarmData.createAt)}
            </Txt>
          </Top>
          <Txt size="typo5" color={alarmData.isRead ? '#424242' : '#FF706C'}>
            {alarmText.main}
          </Txt>
          <Txt size="typo6" color="#616161">
            {alarmText.sub}
          </Txt>
        </Block>
      </Link>
    );
  }
);

AlarmBlock.displayName = 'AlarmBlock';
