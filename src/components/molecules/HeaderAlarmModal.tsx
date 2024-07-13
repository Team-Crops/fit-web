import { useCallback, useEffect, useRef } from 'react';

import styled from '@emotion/styled';

import { useAlarmQuery } from '#/hooks/use-alarm';
import { Txt } from '../atoms';
import { AlarmBlock } from '../atoms/AlarmBlock';

const AlarmModal = styled.div`
  position: absolute;
  top: 75px;
  right: -30px;

  width: 507px;
  padding: 18px 0 24px;

  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 40px 0 rgb(0 0 0 / 15%);
`;
const Title = styled(Txt)`
  padding: 0 0 7px 25px;
`;
const AlarmList = styled.div`
  overflow-y: auto;
  max-height: 500px;
`;

interface HeaderAlarmModalProps {
  isOpen: boolean;
  toggleModal: () => void;
}

export const HeaderAlarmModal = ({ isOpen, toggleModal }: HeaderAlarmModalProps) => {
  const { data: alarms, setSize } = useAlarmQuery();
  const observerRef = useRef<IntersectionObserver | null>(null);

  const observeLastAlarm = useCallback(
    (node: HTMLDivElement) => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setSize((size) => size + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [setSize]
  );

  useEffect(() => {
    if (isOpen) {
      setSize(1);
    }
  }, [setSize, isOpen]);

  if (!isOpen) return null;
  return (
    <AlarmModal
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Title size="typo5" weight="bold" color="#424242">
        알림
      </Title>
      <AlarmList>
        {alarms?.map((page, pageIndex) =>
          page.pageResult.values.map((alarm, alarmIndex) => {
            const isLastAlarm =
              pageIndex === alarms.length - 1 && alarmIndex === page.pageResult.values.length - 1;
            return (
              <AlarmBlock
                key={alarm.id}
                alarmData={alarm}
                toggleModal={toggleModal}
                ref={isLastAlarm ? observeLastAlarm : null}
              />
            );
          })
        )}
      </AlarmList>
    </AlarmModal>
  );
};
