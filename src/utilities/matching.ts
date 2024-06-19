import { Matching } from '#/types';

export function isMatching(object: any): object is Matching {
  return (
    (typeof object.id === 'number' || object.id === null) &&
    typeof object.userId === 'number' &&
    typeof object.positionId === 'number' &&
    typeof object.status === 'string' &&
    typeof object.expiredAt === 'string' &&
    typeof object.createdAt === 'string'
  );
}
