'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';

import styled from '@emotion/styled';

import { mutate } from 'swr';

import { Button } from '#/components/atoms/Button';
import {
  MATCHING_QUERY_KEY,
  useMatchingCancelMutation,
  useMatchingStartMutation,
} from '#/hooks/use-matching';
import {
  useMatchingRoomCompleteMutation,
  useMatchingRoomQuery,
  useMatchingRoomQuitMutation,
  useMatchingRoomReadyMutation,
} from '#/hooks/use-matching-room';
import { useMeQuery } from '#/hooks/use-user';
import { MatchingRoom } from '#/types';

const ButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;

interface MatchingButtonsProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MatchingButtons = ({ ...props }: MatchingButtonsProps) => {
  return <ButtonsContainer {...props} />;
};

interface MatchingButtonProps extends Partial<React.ComponentProps<typeof Button>> {}

export const MatchingButton = ({
  variant = 'round',
  height = '70',
  color = 'primary',
  ...props
}: MatchingButtonProps) => {
  return <Button variant={variant} height={height} color={color} {...props} />;
};

MatchingButtons.Button = MatchingButton;

export const MatchingLinkButton = ({
  onClick,
  href,
  children,
  ...props
}: MatchingButtonProps & { href: string }) => {
  const router = useRouter();
  return (
    <MatchingButton
      onClick={(e) => {
        router.push(href);
        onClick?.(e);
      }}
      {...props}
    >
      {children ?? href}
    </MatchingButton>
  );
};

MatchingButtons.LinkButton = MatchingLinkButton;

export const MatchingSearchButton = ({ onClick, children, ...props }: MatchingButtonProps) => {
  const { trigger, isMutating } = useMatchingStartMutation();
  return (
    <MatchingButton
      color="primary"
      disabled={isMutating}
      onClick={async (e) => {
        mutate(MATCHING_QUERY_KEY, await trigger());
        onClick?.(e);
      }}
      {...props}
    >
      {children ?? '매칭 시작하기'}
    </MatchingButton>
  );
};

MatchingButtons.SearchButton = MatchingSearchButton;

export const MatchingCancelButton = ({ onClick, children, ...props }: MatchingButtonProps) => {
  const { trigger: cancelMatching } = useMatchingCancelMutation();
  return (
    <MatchingButton
      color="secondary"
      onClick={async (e) => {
        await cancelMatching();
        await mutate(MATCHING_QUERY_KEY, undefined);
        onClick?.(e);
      }}
      {...props}
    >
      {children ?? '매칭 중단하기'}
    </MatchingButton>
  );
};

MatchingButtons.CancelButton = MatchingCancelButton;

export const MatchingReadyButton = ({
  matchingId,
  ...props
}: Omit<MatchingButtonProps, 'onClick'> & { matchingId: MatchingRoom['id'] }) => {
  const router = useRouter();

  const { data: me } = useMeQuery();
  const { data: room, mutate: mutateRoom } = useMatchingRoomQuery(matchingId);

  const { trigger: ready, isMutating: isReadyMutating } = useMatchingRoomReadyMutation(matchingId);
  const { trigger: start, isMutating: isStartMutating } =
    useMatchingRoomCompleteMutation(matchingId);

  const matchingMe = useMemo(
    () => room?.matchingUsers.find((u) => u.id === me?.id),
    [me?.id, room?.matchingUsers]
  );

  return matchingMe?.isHost ? (
    <MatchingButton
      disabled={!room?.matchingUsers.every((u) => u.isReady || u.isHost) || isStartMutating}
      onClick={async () => {
        await start();
        router.push('/projects');
      }}
      {...props}
    >
      시작하기
    </MatchingButton>
  ) : (
    <MatchingButton
      disabled={isReadyMutating}
      onClick={async () => {
        await ready({ isReady: !matchingMe?.isReady });
        await mutateRoom();
      }}
      {...props}
    >
      {matchingMe?.isReady ? '준비 취소하기' : '준비하기'}
    </MatchingButton>
  );
};

MatchingButtons.ReadyButton = MatchingReadyButton;

export const MatchingQuitButton = ({
  matchingId,
  children,
  ...props
}: Omit<MatchingButtonProps, 'onClick'> & { matchingId: MatchingRoom['id'] }) => {
  const { trigger, isMutating } = useMatchingRoomQuitMutation(matchingId);
  return (
    <MatchingButton
      color="secondary"
      disabled={isMutating}
      onClick={async () => {
        await trigger();
        await mutate(MATCHING_QUERY_KEY, undefined);
      }}
      {...props}
    >
      {children ?? '대기방에서 나가기'}
    </MatchingButton>
  );
};

MatchingButtons.QuitButton = MatchingQuitButton;
